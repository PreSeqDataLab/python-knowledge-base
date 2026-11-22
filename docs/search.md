# 检索入口

本书使用 VitePress 本地搜索，基于 MiniSearch，索引在首次搜索时下载到浏览器，之后可离线使用，无需后端服务。

## 如何使用

- 点击导航栏的“搜索文档”按钮，或按 `Ctrl + K` / `⌘ + K`。
- 支持多关键词组合，例如：`FastAPI 依赖注入`、`RAG 评估`。
- 结果按标题、正文、层级标题加权排序。
- 中文使用自定义分词：优先 `Intl.Segmenter`，不支持时回退到单字 + 双字切分。

## 检索约定

为便于搜索，写作时遵循：

1. 标题使用具体名词，避免“一些说明”这类泛化标题。
2. 命令、函数名、配置项用反引号包裹，例如 `python --version`、`conda activate`。
3. 每个概念至少出现在一个“复习要点”中，保证可被搜到。
4. 中英文术语同时出现，例如 `依赖注入 (Dependency Injection)`。
5. 长文章用二级、三级标题切分，搜索结果更容易定位到小节。

## 分主题快速入口

- [Python 速查](cheatsheet.md#python)
- [Web 速查](cheatsheet.md#web)
- [AI / RAG 速查](cheatsheet.md#ai--rag)
- [计算机基础速查](cheatsheet.md#计算机基础)
- [面试题库](interview.md)
