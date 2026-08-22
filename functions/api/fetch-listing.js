// functions/api/fetch-listing.js
// Cloudflare Pages Function — fetches Amazon product page and extracts listing data
// Deploy: put this file in your project's functions/api/ directory
// Cloudflare Pages auto-deploys it as: POST https://sharonecom.com/api/fetch-listing

const ALLOWED_ORIGINS = ['https://sharonecom.com', 'https://www.sharonecom.com'];

const ALLOWED_AMAZON_DOMAINS = [
  'amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.fr',
  'amazon.it', 'amazon.es', 'amazon.co.jp', 'amazon.ca', 'amazon.com.au',
  'amazon.com.mx', 'amazon.com.br', 'amazon.in',
];

function isAllowedAmazonUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    return ALLOWED_AMAZON_DOMAINS.some(d => parsed.hostname === d || parsed.hostname === 'www.' + d);
  } catch {
    return false;
  }
}

export async function onRequestPost({ request }) {
  const origin = request.headers.get('Origin') || '';
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await request.json();
    if (!url || !isAllowedAmazonUrl(url)) {
      return jsonResponse({ error: 'Invalid Amazon URL' }, 400, corsHeaders);
    }

    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    });

    if (!resp.ok) {
      return jsonResponse({ error: `Amazon returned ${resp.status}` }, 502, corsHeaders);
    }

    const html = await resp.text();

    // Extract data using regex (Workers don't have DOMParser)
    const data = extractListingData(html, url);

    return jsonResponse(data, 200, corsHeaders);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500, corsHeaders);
  }
}

function jsonResponse(data, status, corsHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

function extractListingData(html, url) {
  // Extract ASIN from URL
  const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/) || url.match(/\/gp\/product\/([A-Z0-9]{10})/);
  const asin = asinMatch ? asinMatch[1] : '';

  // Title
  let title = '';
  const titleMatch = html.match(/<span[^>]*id="productTitle"[^>]*>([\s\S]*?)<\/span>/);
  if (titleMatch) title = titleMatch[1].trim();

  // Brand
  let brand = '';
  const brandMatch = html.match(/<a[^>]*id="bylineInfo"[^>]*>([\s\S]*?)<\/a>/);
  if (brandMatch) {
    brand = brandMatch[1].replace(/^(Visit the |Brand: )/, '').replace(/ Store$/, '').trim();
  }

  // Bullet points
  const bullets = [];
  const bulletRegex = /<span[^>]*class="a-list-item"[^>]*>([\s\S]*?)<\/span>/g;
  let bm;
  const bulletSection = html.match(/<div[^>]*id="feature-bullets"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
  if (bulletSection) {
    while ((bm = bulletRegex.exec(bulletSection[1])) !== null) {
      const text = bm[1].replace(/<[^>]+>/g, '').trim();
      if (text && text.length > 10 && !text.includes('Show more')) {
        bullets.push(text);
      }
    }
  }

  // Item Highlight (2026 new field)
  let highlight = '';
  const hlMatch = html.match(/<div[^>]*id="itemHighlights"[^>]*>([\s\S]*?)<\/div>/);
  if (hlMatch) {
    highlight = hlMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Product description (often replaced by A+)
  let description = '';
  const descMatch = html.match(/<div[^>]*id="productDescription"[^>]*>([\s\S]*?)<\/div>/);
  if (descMatch) {
    description = descMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // A+ content detection
  const hasAplus = html.includes('aplus-v2') || html.includes('aplus') || html.includes('AplusModule');

  // BSR (Best Sellers Rank)
  let bsrRank = '';
  let bsrCategory = '';
  const bsrMatch = html.match(/Best\s*Sellers\s*Rank[^>]*>[\s\S]*?#?([\d,]+)\s*(?:in|in\s)<a[^>]*>([^<]+)/i);
  if (bsrMatch) {
    bsrRank = '#' + bsrMatch[1];
    bsrCategory = bsrMatch[2].trim();
  }
  // Fallback BSR parse
  if (!bsrRank) {
    const bsrAlt = html.match(/Best\s*Sellers\s*Rank[\s\S]*?#[\d,]+/i);
    if (bsrAlt) bsrRank = bsrAlt[0].match(/#[\d,]+/)[0];
  }

  // Category path (breadcrumbs)
  let categoryPath = '';
  const crumbMatch = html.match(/wayfinding-breadcrumbs[\s\S]*?<\/ul>/);
  if (crumbMatch) {
    const crumbs = crumbMatch[0].match(/<a[^>]*>([^<]+)<\/a>/g);
    if (crumbs) {
      categoryPath = crumbs.map(c => c.replace(/<[^>]+>/g, '').trim()).filter(c => c).join(' > ');
    }
  }

  // Image count
  let imageCount = 0;
  const imgMatches = html.match(/data-old-hires="https:\/\/[^"]+"/g);
  if (imgMatches) {
    imageCount = new Set(imgMatches).size;
  }
  if (imageCount === 0) {
    const altImgMatches = html.match(/<li[^>]*class="image[^"]*item[^"]*"/g);
    if (altImgMatches) imageCount = altImgMatches.length;
  }

  // Main image zoom check (if image URL contains very high res)
  const mainImgMatch = html.match(/data-old-hires="(https:\/\/[^"]+)"/);
  let hasZoom = false;
  if (mainImgMatch) {
    // SL1000+ = zoom enabled per Amazon: minimum 1000px on longest side
    hasZoom = /SL1[0-9]{3}/.test(mainImgMatch[1]) || /SL2[0-9]{3}/.test(mainImgMatch[1]) || /SL3[0-9]{3}/.test(mainImgMatch[1]);
  }

  return {
    asin,
    title,
    brand,
    bullets,
    highlight,
    description,
    hasAplus,
    bsrRank,
    bsrCategory,
    categoryPath,
    imageCount,
    hasZoom,
    source: 'amazon-detail-page',
    fetchedAt: new Date().toISOString(),
  };
}
