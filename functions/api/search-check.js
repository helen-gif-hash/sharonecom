// functions/api/search-check.js
// Cloudflare Pages Function — checks if a product is findable by keyword search on Amazon
// Deploy: put this file in your project's functions/api/ directory
// Cloudflare Pages auto-deploys it as: POST https://sharonecom.com/api/search-check

export async function onRequestPost({ request }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords, asin, marketplace } = await request.json();

    if (!keywords || !asin) {
      return jsonResponse({ error: 'Missing keywords or asin' }, 400, corsHeaders);
    }

    const domain = getDomain(marketplace || 'US');

    // 1. Check if ASIN is directly accessible
    const productUrl = `https://www.${domain}/dp/${asin}`;
    const productResp = await fetch(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });

    const asinLive = productResp.ok && !productResp.url.includes('NotFound');

    // 2. Check if product appears in keyword search
    const searchUrl = `https://www.${domain}/s?k=${encodeURIComponent(keywords)}`;
    const searchResp = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });

    let keywordFound = false;
    if (searchResp.ok) {
      const searchHtml = await searchResp.text();
      // Check if ASIN appears in search results
      keywordFound = searchHtml.includes(asin) || searchHtml.includes(`/dp/${asin}`) || searchHtml.includes(`data-asin="${asin}"`);
    }

    return jsonResponse({
      asin,
      asinLive,
      keywordFound,
      keywords,
      searchUrl,
      productUrl,
      checkedAt: new Date().toISOString(),
    }, 200, corsHeaders);
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

function getDomain(marketplace) {
  const domains = {
    US: 'amazon.com', UK: 'amazon.co.uk', DE: 'amazon.de', FR: 'amazon.fr',
    IT: 'amazon.it', ES: 'amazon.es', JP: 'amazon.co.jp', CA: 'amazon.ca', AU: 'amazon.com.au',
  };
  return domains[marketplace] || 'amazon.com';
}
