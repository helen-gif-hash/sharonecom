# SharonEcom 项目交接文件

> 更新日期：2026-07-30 | 给新对话窗口使用

---

## 1. 项目路径

| 项目 | 路径 |
|------|------|
| 项目文件夹 | `C:\Users\123\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a5de7973940473642042ac7` |
| 主文件 | `index.html`（纯静态，CSS 内联，无外部依赖） |
| 备份目录 | `_backups\`（按日期分文件夹，修改前备份） |
| 图片目录 | `assets\images\` |
| GitHub | `https://github.com/helen-gif-hash/sharonecom` |
| 部署 | Cloudflare Pages + GitHub 自动部署 |

---

## 2. 当前文件结构

```
sharonecom/
├── index.html                          ← 主文件
├── HANDOFF.md                          ← 本文件
├── README.md
├── STYLE_GUIDE.md                      ← 旧版规范文档（已过期，仅供参考）
├── robots.txt
├── sitemap.xml
├── _backups/
│   └── 2026-07-29/
│       └── index.html
├── tools/
│   └── amazon-fba-profit-calculator.html  ← FBA 利润计算器子页
└── assets/
    └── images/
        ├── playbooks-kit-cover.jpg     ← Playbooks 封面图
        ├── blog-star-rating.jpg        ← Blog 精选文章配图
        └── _archive/                   ← 备用图片归档
```

---

## 3. 全局配色（CSS Variables）

```css
--primary:       #6E56CF    /* 品牌主色：Logo、按钮、标签、焦点边框 */
--primary-hover: #5A44C0    /* 按钮 hover */
--primary-soft:  #F0EBFA    /* 浅紫背景：图标底、Contact 表单背景、勾选圆底 */
--accent:        #FFCD4D    /* 预留，暂未使用 */
--bg:            #FFFFFF    /* 页面主背景 */
--surface:       #F7F8FA    /* 次级背景：工具卡片、Playbooks 左侧图片区 */
--text:          #1B1B1F    /* 主文字 */
--muted:         #5B5B66    /* 次级文字 */
--border:        #E6E6EA    /* 边框 */
--radius:        8px        /* 小圆角 */
--radius-card:   12px       /* 大圆角 */
```

---

## 4. 容器宽度（重要）

| 页面 | 类名 | CSS | 实际内容宽度 |
|------|------|-----|-------------|
| 主页（导航栏 + 内容区） | `.container` | `max-width: 1200px; padding: 0 24px` | 1152px |
| 子页（导航栏） | `.container` | `max-width: 1200px; padding: 0 24px` | 1152px |
| 子页（内容区） | `.wrap` | `max-width: 1200px; padding: 20px 16px 48px` | 1168px |

> 注意：子页导航栏和内容区 padding 不同（24px vs 16px），视觉上略有偏差。用户已知晓并选择暂时不改。

---

## 5. 当前页面结构（4 个板块 + Hero + Footer）

### 导航栏
- SharonEcom（Logo） + Tools / Playbooks / Blog / Contact
- 锚点 ID：`#tools` `#playbooks` `#blog` `#contact`

### 模块 1：Free Tools（`#tools`）
- 标签：Free Tools
- 标题：**Tools that turn spreadsheets into clarity.**
- 副标题：**Free calculators and hands-on templates built from years of Amazon operations. No signup required for most.**
- **大卡片（Featured）**：Amazon FBA Profit Calculator
  - 紫色渐变背景 + 2px 紫色边框
  - 按钮："Open calculator →"（链接到 `tools/amazon-fba-profit-calculator.html`）
- **3 个小卡片**（每张带 `Open in Google Sheets` 链接按钮，新标签页打开）：
  - Amazon Review Score Calculator → `https://docs.google.com/spreadsheets/d/1yJzs8KC6B-7e4Zz2e6Hd7qvVwr626z_Wv4qUMzZ5HYs/edit?usp=sharing`
  - Deal Profitability Checker → `https://docs.google.com/spreadsheets/d/1ccLxJf8DTwsx880Rf-aYWzvfwkZgHt4j/edit?usp=sharing`
  - Reference Price Monitoring Table → `https://docs.google.com/spreadsheets/d/1hLN0xot0gXQ42E0yVwLw1ju8cNHkEXW1ouqvqKnL5CA/edit?usp=sharing`

### 模块 2：Playbooks（`#playbooks`）
- 标签：Playbooks
- 标题：New Product Launch Kit for Amazon Sellers
- 副标题：A practical starter toolkit designed for operators who don't have a full team or whose products have not yet been launched.
- 布局：左右分栏卡片
  - 左侧（340px，浅灰底 `--surface`）：封面图片 `assets/images/playbooks-kit-cover.jpg`
  - 右侧（flex:1）：紫色勾选功能列表（6 项，15px 字号）
  - 底部 CTA 行：$9.99（28px 紫色） + 邮箱输入框（280px）+ "Get the kit" 按钮

### 模块 3：Blog（`#blog`）
- 标签：Blog
- 标题：Guides built around real seller questions.
- 副标题：Each article targets a search term real Amazon sellers type into Google — not generic "top 10 tips" content.
- 布局：左右分栏
  - 左侧：封面图片 `assets/images/blog-star-rating.jpg`
  - 右侧：分类标签 "Reviews" + 文章标题 + 描述 + "Read more →" 链接
  - 链接指向 `/blog/amazon-real-star-rating.html`（**文件尚未创建**）

### 模块 4：Contact（`#contact`）
- 标签：Contact
- 标题：Work with an operator who's been inside the account.
- 副标题：For brands ready to move beyond the listing — Amazon and DTC joint operations, external traffic strategy, and operational audits.
- 布局：左右分栏
  - 左侧（flex:1，白色）：服务标题 + 描述 + 3 项紫色勾选列表（15px 字号）
  - 右侧（340px，浅紫底 `--primary-soft`）："Get in touch" + 表单（姓名/主题/留言） + "Send" 按钮
  - 表单通过 JS 拦截提交，需替换 `YOUR_FORM_ENDPOINT` 为实际端点

---

## 6. 重要 CSS 类名速查

| 用途 | 类名 |
|------|------|
| 页面容器 | `.container` |
| 子页容器 | `.wrap` |
| 板块 | `.section` |
| 板块标签 | `.section-label` |
| 板块标题 | `.section-title` |
| 板块描述 | `.section-desc`（已设 `white-space: nowrap`，移动端恢复换行） |
| 主按钮 | `.btn-primary` |
| 次按钮 | `.btn-outline` |
| 工具卡片网格 | `.tools-grid`（3 列） |
| 工具卡片 | `.tool-card` |
| 工具徽章（链接） | `.tool-badge`（hover 时紫色填充 + 白字） |
| 精选大卡片 | `.featured-tool` + `.featured-tool-icon` + `.featured-tool-info` + `.featured-tool-cta-link` |
| Playbooks 容器 | `.kit-hero` > `.kit-hero-left` + `.kit-hero-right` |
| Playbooks 功能列表 | `.kit-features`（紫色勾选） |
| Playbooks CTA 行 | `.kit-cta-row`（价格 + 邮箱并排） |
| 邮箱表单 | `.email-form` |
| Blog 精选文章 | `.featured-article` > `.featured-img` + `.featured-text` |
| Contact 容器 | `.contact-box` > `.contact-info` + `.contact-form-wrap` |
| Contact 表单 | `.contact-form` |

---

## 7. 工作约定

- **每次修改前先备份**：将 `index.html` 复制到 `_backups\YYYY-MM-DD\index.html`
- **颜色只用 CSS 变量**：禁止硬编码色值，必须用 `var(--xxx)`
- **导航栏名称不随意修改**：当前为 Tools / Playbooks / Blog / Contact
- **导航栏所有项色调一致**：不要强调 Blog
- **Hero 文案要地道英语**，不要中文思维
- **副标题不换行**：`.section-desc` 已设 `white-space: nowrap`
- **紫色勾选标记**：Playbooks 和 Contact 的勾选统一用紫色
- **子页必须独立文件**：不要和主页或其他模块混在一起
- **子页必须包含与主页一致的导航栏**
- **子页配色统一**：`.container` 使用 `max-width: 1200px`

---

## 8. 待办事项

- [x] Google Sheets 三个工具卡片已添加链接（2026-07-30）
- [x] Free Tools 标题已更新为 clarity 版本（2026-07-30）
- [x] FBA Profit Calculator 子页已创建（2026-07-30）
- [x] 容器宽度统一为 1200px（2026-07-30）
- [ ] **Contact 表单**：替换 `YOUR_FORM_ENDPOINT` 为 Formspree 或 Web3Forms 实际端点
- [ ] **Blog 子页**：创建 `/blog/amazon-real-star-rating.html`
- [ ] **更新 `sitemap.xml`**：添加新子页 URL
- [ ] **更新 `STYLE_GUIDE.md`**：当前版本已严重过期

---

## 9. 变更记录

- **2026-07-30**：Google Sheets 三个工具卡片改为 `Open in Google Sheets` 链接按钮，hover 紫色填充动效
- **2026-07-30**：Free Tools 标题改为 "Tools that turn spreadsheets into clarity."，副标题改为 "Free calculators and hands-on templates built from years of Amazon operations. No signup required for most."
- **2026-07-30**：主页 `.container` 和子页 `.wrap` 统一 `max-width: 1200px`
- **2026-07-30**：创建 `tools/amazon-fba-profit-calculator.html` 独立子页，支持 12 市场，Chart.js 图表，紫色主题
- **2026-07-30**：Playbooks 封面图二次修订，替换火箭为上升图表。所有旧图保留在 `assets/images/_archive/`
- **2026-07-30**：Blog 精选文章配图上线（`blog-star-rating.jpg`）
- **2026-07-30**：修复 Playbooks CTA 行 $9.99 与输入框不齐平问题
