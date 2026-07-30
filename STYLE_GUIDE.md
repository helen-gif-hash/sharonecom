# SharonEcom 项目规范文档

> 版本 v1.0 | 最后更新 2026-07-22

---

## 1. 项目基本信息

### 项目路径

| 项目 | 路径 |
|------|------|
| 本地文件夹 | `C:\Users\123\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a5de7973940473642042ac7` |
| GitHub 仓库 | `https://github.com/helen-gif-hash/sharonecom` |
| Cloudflare Pages | 待部署 |

### 文件结构

```
sharonecom/
├── index.html          # 唯一入口页面，内联 CSS（无外部依赖）
├── robots.txt          # 搜索引擎爬虫规则
├── sitemap.xml         # Google 站点地图
├── README.md           # 仓库说明
└── STYLE_GUIDE.md      # 本文件：项目规范文档
```

### 技术架构

- **纯静态 HTML**：单文件 `index.html`，CSS 内联写在 `<style>` 标签中
- **无外部依赖**：不依赖任何 CSS 框架、JS 库或构建工具
- **部署方式**：Cloudflare Pages 连接 GitHub，push 即自动部署

---

## 2. 全局配色

所有颜色通过 CSS 自定义属性定义在 `:root` 中，来源为 PostHog 浅色设计系统。

| CSS 变量 | 色值 | 色块 | 用途 |
|----------|------|------|------|
| `--primary` | `#6E56CF` | ██████ | 品牌主色：Logo、主按钮、焦点边框、高亮文字 |
| `--primary-hover` | `#5A44C0` | ██████ | 主按钮悬停态 |
| `--primary-soft` | `#F0EBFA` | ██████ | 浅紫背景：工具图标底色、Kit 卡片高亮 |
| `--accent` | `#FFCD4D` | ██████ | 强调色（当前预留，暂未使用） |
| `--bg` | `#FFFFFF` | ██████ | 页面主背景 |
| `--surface` | `#F7F8FA` | ██████ | 次级背景：导航栏、卡片底色、Kit 背景区 |
| `--text` | `#1B1B1F` | ██████ | 主文字：标题、正文 |
| `--muted` | `#5B5B66` | ██████ | 次级文字：描述、导航链接、标签 |
| `--border` | `#E6E6EA` | ██████ | 边框：分割线、卡片描边、输入框 |

### 使用规则

- **禁止在组件选择器中硬编码颜色值**，必须使用 `var(--xxx)` 引用
- 主按钮：`background: var(--primary); color: #fff`（白字不需要 token）
- 次按钮：`background: var(--bg); color: var(--primary); border: 1.5px solid var(--primary)`
- 卡片背景统一用 `var(--surface)`，禁止用品牌色做卡片填充
- 品牌色只用文字、边框、按钮上，不做大面积底色

---

## 3. 排版标准

### 字体

```
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

系统原生字体栈，优先使用各平台最优渲染字体，无需加载外部 Web 字体。

### 字号层级

| 元素 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| Hero 标题 `h1` | 40px | 700 | 1.25 | 首页主标题 |
| Hero 副标题 `.sub` | 16px | 400 | 1.6 | 首页副文案 |
| 板块标题 `.section-title` | 28px | 700 | 1.3 | 各板块大标题 |
| 板块描述 `.section-desc` | 15px | 400 | 1.6 | 板块副文案 |
| Kit 主标题 `h3` | 22px | 700 | — | 付费 Kit 大标题 |
| 精选文章标题 `h3` | 18px | 700 | 1.35 | Blog 精选文章标题 |
| 导航 Logo `.nav-logo` | 18px | 700 | — | 左上角 Logo |
| 导航链接 `.nav-links a` | 14px | 400 | — | 导航栏链接 |
| 工具卡片标题 `h3` | 15px | 600 | 1.3 | 工具卡片名称 |
| Kit 卡片标题 `h4` | 15px | 600 | 1.3 | Kit 卡片名称 |
| 按钮文字 | 14px | 600 | — | 所有按钮 |
| 板块标签 `.section-label` | 12px | 700 | — | 板块英文标签 |
| 工具卡片描述 `p` | 13px | 400 | 1.55 | 工具卡片描述 |
| Kit 项目标签 `.kit-items span` | 12px | 400 | — | Kit 内包含项标签 |
| 价格 `.price` | 24px | 700 | — | 付费 Kit 价格 |
| 小价格 `.k-price` | 13px | 700 | — | Kit 卡片价格 |
| Footer | 12px | 400 | — | 页脚 |

### 文字颜色

- 标题：`var(--text)` → `#1B1B1F`
- 正文 / 描述：`var(--muted)` → `#5B5B66`
- 紫色高亮：`var(--primary)` → `#6E56CF`

---

## 4. 圆角 & 间距

### 圆角

| CSS 变量 | 值 | 用途 |
|----------|-----|------|
| `--radius` | 8px | 小元素圆角（图片占位框） |
| `--radius-card` | 12px | 卡片、Kit 展示区、板块容器 |

### 间距

全站统一使用以下间距值（通过 padding / gap / margin 实现）：

| 场景 | 推荐值 |
|------|--------|
| 板块上下间距 | `72px`（`padding: 72px 0`） |
| 元素与标题间距 | `36px`（`margin-top: 36px`） |
| 卡片内边距 | `24px` |
| 大容器内边距 | `36px` |
| 网格卡片间距 | `20px`（`gap: 20px`） |
| 导航链接间距 | `32px` |
| 按钮间距 | `12px` |

### 页面最大宽度

```css
.container { max-width: 1040px; margin: 0 auto; padding: 0 24px; }
```

---

## 5. Class 命名规则

### 命名规范

- **全小写 + 连字符**（kebab-case）：`section-title`、`kit-hero-img`
- **语义化命名**：描述元素的角色而非外观，如 `tool-card` 而非 `gray-card`
- **BEM 松散风格**：父级 + 子级用连字符连接，如 `kit-hero`（父）→ `kit-hero-img`（子）
- **禁止**：驼峰、下划线、拼音、无意义缩写

### 完整 Class 清单

#### 布局类

| Class | 作用 |
|-------|------|
| `.container` | 全局内容容器，限定最大宽度并居中 |
| `.section` | 板块容器，提供上下间距 |
| `.navbar` | 导航栏容器 |
| `.footer` | 页脚容器 |

#### 导航类

| Class | 作用 |
|-------|------|
| `.nav-logo` | 左上角品牌名 |
| `.nav-links` | 导航链接列表 `<ul>` |

#### Hero 类

| Class | 作用 |
|-------|------|
| `.hero` | Hero 区域容器 |
| `.hero h1` | 主标题 |
| `.hero .sub` | 副标题 |
| `.hero-btns` | 按钮容器 |
| `.btn-primary` | 主按钮（紫色填充） |
| `.btn-outline` | 次按钮（紫色描边） |

#### 板块通用类

| Class | 作用 |
|-------|------|
| `.section-label` | 板块英文标签（如 PRACTICAL KIT） |
| `.section-title` | 板块大标题（`<h2>`） |
| `.section-desc` | 板块描述文字 |

#### 工具卡片类（Practical Kit）

| Class | 作用 |
|-------|------|
| `.tools-grid` | 3 列网格容器 |
| `.tool-card` | 单个工具卡片 |
| `.tool-icon` | 工具图标（emoji 容器） |

#### 付费 Kit 类

| Class | 作用 |
|-------|------|
| `.kit-hero` | 主打 Kit 左右分栏容器 |
| `.kit-hero-img` | 左栏：Kit 图片占位 |
| `.kit-hero-info` | 右栏：价格 + 标签 + 邮箱表单 |
| `.price` | 主打 Kit 价格 |
| `.kit-items` | 包含项标签容器 |
| `.email-form` | 邮箱输入表单 |
| `.kit-grid` | 3 列 Kit 卡片网格 |
| `.kit-card` | 单个 Kit 卡片 |
| `.k-price` | Kit 卡片价格 |

#### Blog 类

| Class | 作用 |
|-------|------|
| `.featured-article` | 精选文章左右分栏容器 |
| `.featured-img` | 左栏：文章图片占位 |
| `.featured-text` | 右栏：文章标题 + 描述 + 链接 |
| `.featured-cat` | 文章分类标签 |
| `.featured-link` | "Read more →" 链接 |

#### Consulting 类

| Class | 作用 |
|-------|------|
| `.consult-box` | 咨询卡片左右分栏容器 |
| `.consult-img` | 左栏：个人照片占位 |
| `.consult-info` | 右栏：服务标题 + 描述 + 列表 |

#### Footer 类

| Class | 作用 |
|-------|------|
| `.footer-links` | 底部链接容器 |

---

## 6. 组件结构

### 页面骨架（从上到下）

```
┌─────────────────────────────────┐
│  Navbar                         │  .navbar > .nav-logo + .nav-links
├─────────────────────────────────┤
│  Hero                           │  .hero > h1 + .sub + .hero-btns
├─────────────────────────────────┤
│  Practical Kit (Free Tools)     │  .section > .section-label + .section-title + .section-desc + .tools-grid
│  ┌─────┐ ┌─────┐ ┌─────┐      │
│  │tool │ │tool │ │tool │      │
│  │card │ │card │ │card │      │
│  └─────┘ └─────┘ └─────┘      │
│  ┌─────┐ ┌─────┐ ┌─────┐      │
│  │tool │ │tool │ │tool │      │
│  │card │ │card │ │card │      │
│  └─────┘ └─────┘ └─────┘      │
├─────────────────────────────────┤
│  What's Inside (Paid Kits)      │  .section > .kit-hero + .kit-grid
│  ┌──────────┬────────────────┐  │
│  │ Kit Img  │ Price + Tags   │  │
│  │ 占位     │ + Email Form   │  │
│  └──────────┴────────────────┘  │
│  ┌─────┐ ┌─────┐ ┌─────┐      │
│  │ Kit │ │ Kit │ │ Kit │      │
│  │card │ │card │ │card │      │
│  └─────┘ └─────┘ └─────┘      │
├─────────────────────────────────┤
│  Blog                           │  .section > .featured-article
│  ┌──────────┬────────────────┐  │
│  │  Img     │ Title + Desc   │  │
│  │  占位    │ + Read more →  │  │
│  └──────────┴────────────────┘  │
├─────────────────────────────────┤
│  Consulting                     │  .section > .consult-box
│  ┌──────────┬────────────────┐  │
│  │  Photo   │ Title + List   │  │
│  │  占位    │ + Email btn    │  │
│  └──────────┴────────────────┘  │
├─────────────────────────────────┤
│  Footer                         │  .footer > span + .footer-links
└─────────────────────────────────┘
```

### 按钮规则

| 类型 | Class | 外观 | 使用场景 |
|------|-------|------|----------|
| 主按钮 | `.btn-primary` | 紫底白字，圆角胶囊 | Hero CTA、Kit 购买 |
| 次按钮 | `.btn-outline` | 白底紫边紫字，圆角胶囊 | Hero 次要 CTA、Consulting 联系 |

---

## 7. 图片路径

### 当前图片占位

当前 `index.html` 中图片均为虚线框占位符，代码中标注了 `<!-- 🖼️ Replace with actual image: xxx -->`，共 4 处：

| 位置 | 所在 Class | 用途 | 待替换内容 |
|------|-----------|------|-----------|
| 1 | `.kit-hero-img` | 付费 Kit 展示图 | Kit 封面 + 内部表格预览 |
| 2 | `.featured-img` | Blog 精选文章图 | 亚马逊星级评分截图 |
| 3 | `.consult-img` | Consulting 个人照 | 个人工作照或品牌案例截图 |
| 4 | `.tool-icon` | 6 个工具卡片图标 | 当前为 emoji（💰📋⭐⚡📊📝），无需替换 |

### 图片存放路径

图片文件需放在以下目录（完整路径）：

```
C:\Users\123\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a5de7973940473642042ac7\assets\images\
├── kit-cover.jpg          # Kit 封面展示图
├── blog-star-rating.jpg   # 星级评分截图
└── photo.jpg              # 个人照片
```

HTML 中引用路径：`assets/images/文件名.jpg`

### 替换方法

将图片放入 `assets/images/` 后，在 `index.html` 中替换占位 `<div>` 为 `<img>`：

```html
<!-- 替换前 -->
<div class="kit-hero-img">
  Kit cover &amp; spreadsheet preview<br>image goes here
</div>

<!-- 替换后 -->
<div class="kit-hero-img">
  <img src="assets/images/kit-cover.jpg" alt="New Product Launch Kit preview" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-card);">
</div>
```

---

## 8. 响应式断点

| 断点 | 触发条件 | 变化 |
|------|----------|------|
| 移动端 | `max-width: 768px` | 所有网格 → 单列；左右分栏 → 上下堆叠；Hero 标题缩小 |

### 移动端具体变化

- `.tools-grid`：3 列 → 1 列
- `.kit-hero`：左右分栏 → 上下堆叠
- `.kit-grid`：3 列 → 1 列
- `.featured-article`：左右分栏 → 上下堆叠（图片在上）
- `.consult-box`：左右分栏 → 上下堆叠
- `.hero h1`：40px → 28px
- `.footer`：水平排列 → 垂直堆叠

---

## 9. 交互状态

| 元素 | 状态 | 效果 |
|------|------|------|
| 卡片（tool-card, kit-card, consult-box） | hover | 边框变紫 `border-color: var(--primary)` |
| 导航链接 | hover | 文字变深 `color: var(--text)` |
| 主按钮 | hover | 背景变深 `background: var(--primary-hover)` |
| 次按钮 | hover | 背景变浅紫 `background: var(--primary-soft)` |
| 精选文章链接 | hover | 文字变紫 `color: var(--primary)` |
| Footer 链接 | hover | 文字变深 `color: var(--text)` |
| 输入框 | focus | 边框变紫 `border-color: var(--primary)` |

所有过渡动画统一为 `transition: <property> 0.15s`。

---

## 10. 页面 ID 锚点

| ID | 对应板块 | 导航栏链接 |
|----|---------|-----------|
| `#tools` | Practical Kit（免费工具） | Tools |
| `#templates` | What's Inside（付费 Kit） | Templates |
| `#blog` | Blog（精选文章） | Blog |
| `#consulting` | Consulting（咨询服务） | Consulting |

---

## 11. 后续扩展目录结构

```
sharonecom/
├── index.html              # 首页
├── robots.txt
├── sitemap.xml
├── README.md
├── STYLE_GUIDE.md          # 本文件
├── assets/
│   └── images/             # 全站图片资源
├── blog/                   # 博客子页面
│   └── amazon-real-star-rating.html   # 第一篇博文
├── tools/                  # 工具子页面
│   ├── profit-calculator.html
│   └── review-calculator.html
└── templates/              # Kit 详情页
    └── launch-kit.html
```

---

## 12. SEO 元数据

当前 `index.html` 已包含：

```html
<meta name="description" content="Amazon growth tools, from the operator's desk. Free calculators, templates, and kits for lean sellers — built from real account work.">
<title>SharonEcom — Amazon growth tools, from the operator's desk</title>
```

`robots.txt` 允许全站抓取，`sitemap.xml` 已包含首页 URL。扩展新页面后需同步更新 `sitemap.xml`。