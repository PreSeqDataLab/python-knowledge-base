# python-knowledge-base

基于 VitePress 的公开知识库，按官网示例结构搭建：项目根目录放 `package.json`，站点源码放在 `docs/`。

四条主线：Python 基础、Web 开发、AI Agent 与 RAG、计算机与必要基础；每条主线按入门、进阶、实战、面试分层。

## 定位

当前根目录同时包含两类内容：

- `docs/`：书籍内容，VitePress 站点源码。
- `main.py` / `requirements.txt`：FastAPI 示例源码，供 Web 开发章节引用，不是站点构建依赖。

这样便于学习和示例联动。若以后要发布为**纯书籍仓库**，可把示例源码移到独立的 `examples/fastapi/` 或另一个源码仓库。

## 目录

```text
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts
│   │   └── theme/
│   ├── index.md
│   ├── roadmap.md
│   ├── workflow.md
│   ├── interview.md
│   ├── cheatsheet.md
│   ├── search.md
│   ├── python-basics/
│   ├── web-development/
│   ├── ai-agent-rag/
│   └── computer-fundamentals/
├── .github/workflows/deploy.yml
├── main.py
├── requirements.txt
├── package.json
├── package-lock.json
└── .gitignore
```

`.venv/`、`node_modules/`、`docs/.vitepress/dist/` 均为本地环境或构建产物，已忽略。

## 本地开发

```bash
npm install
npm run docs:dev
```

默认访问：<http://localhost:5173/python-knowledge-base/>

手机同局域网预览（官网脚本默认只监听 localhost）：

```bash
npx vitepress dev docs --host 0.0.0.0 --port 5173
```

构建与预览：

```bash
npm run docs:build
npm run docs:preview
```

## 部署

推送 `main` 后，GitHub Actions 按官网推荐的 Pages 流程自动构建并部署：

- `actions/checkout@v7`
- `actions/setup-node@v6`
- `actions/configure-pages@v6`
- `actions/upload-pages-artifact@v5`
- `actions/deploy-pages@v5`

默认 Pages 地址为 `https://preseqdatalab.github.io/python-knowledge-base/`。

只有以下路径变化会触发自动部署：`docs/**`、workflow 自身、`package.json`、`package-lock.json`。修改 `main.py` 等示例源码不会重建站点；需要时可在 Actions 页面手动 `Run workflow`。

构建时的 `BASE_PATH` 直接取 `actions/configure-pages` 输出的 `base_path`，项目页（`/python-knowledge-base`）和自定义域名（空路径）都能自动适配，不需要额外配置 Secret。使用自定义域名时，只需在 `Settings → Pages → Custom domain` 填写域名。

仓库地址已在 `docs/.vitepress/config.mts` 中配置。

## 中文搜索

使用 VitePress 本地搜索（MiniSearch），并在 `config.mts` 中自定义 CJK 分词：优先 `Intl.Segmenter('zh')`，否则回退到单字 + 双字切分。无需后端服务。

## 内容规范

每章包含：目标、知识点、示例、练习、复习要点。新增章节后更新 `docs/.vitepress/config.mts` 的 `sidebar`；模板见 `docs/_templates/chapter-template.md`。
