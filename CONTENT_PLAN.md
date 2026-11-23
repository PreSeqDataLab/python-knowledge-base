# 内容规划（CONTENT_PLAN）

> 面向生物信息工程师的 Python 全栈 Web 学习与写作计划。
>
> 版本：v1 · 2026-11-23
>
> 说明：`raw_document/` 中的书籍只作本地参考，不提交、不摘录、不直接翻译。正文用自己的话重写，示例以本仓库代码和可运行的最小项目为主；事实性内容以官方文档为准。

## 0. 一句话目标

用 **Python + FastAPI + Vue** 独立做出可部署的生物信息 Web 应用：能设计 API、能写管理界面、能接数据库、能测试、能用 Docker 部署，并具备继续做 AI/RAG 服务的基础。

## 1. 学习者画像

### 已有基础

- Python 基础语法、常用容器、函数、简单面向对象。
- Linux 基础命令、文件与进程概念。
- Docker 基础：镜像、容器、简单 Dockerfile。
- Git 基础：clone、commit、push、简单分支。
- SQL 基础：建表、增删改查、简单 JOIN。

### 当前缺口

- 计算机基础：HTTP、网络分层、浏览器渲染、进程/线程/内存的工程含义。
- 前端：HTML、CSS、JavaScript、TypeScript 基本为零。
- Vue 3 与前端工程化：未接触。
- FastAPI：只会最小示例，缺少模型、依赖注入、数据库、鉴权、测试、部署经验。
- 工程能力：项目结构、日志、配置、错误契约、CI/CD、可观测性。
- AI/RAG：了解概念，缺少可落地项目。

### 学习目标（按优先级）

1. **能交付**：独立完成一个带前端、数据库、鉴权、测试、Docker 部署的全栈应用。
2. **能排障**：看到 4xx/5xx、CORS、端口、数据库连接、前端空白页时，有固定排查顺序。
3. **能扩展**：在现有 API 上增加文件上传、后台任务、流式响应、AI/RAG 能力。
4. **能表达**：面试时讲清 REST、HTTP、异步、依赖注入、数据库设计、前端状态管理。

### 明确不做（本阶段）

- 不追求前端工程师深度：不学 Nuxt/SSR、微前端、Canvas/WebGL、复杂动画、框架源码。
- 不追求 CS 科班深度：不学编译原理、操作系统内核、算法证明、网络协议实现。
- 不提前上微服务、Kubernetes、消息队列、GraphQL；需要时再学。
- 不同时学多个前端框架；Vue 3 学透再考虑其他。

## 2. 能力矩阵

| 能力 | 现在 | 目标 | 验证方式 |
| --- | --- | --- | --- |
| HTTP / API | 不了解 | 能解释请求响应、方法、状态码、CORS、缓存 | 手写 curl 调通 5 类接口 |
| Python 工程 | 基础语法 | 类型注解、装饰器、上下文管理器、async、项目结构 | 写一个分层 FastAPI 服务 |
| FastAPI | 最小示例 | 路由、Pydantic、DI、DB、鉴权、测试、部署 | 交付 P1/P2 |
| HTML/CSS | 无 | 语义化页面、Flex/Grid、响应式、表单 | 手写管理页布局 |
| JavaScript | 无 | 类型、函数、DOM、事件、fetch/async、模块 | 不查资料写交互页面 |
| TypeScript | 无 | 接口、泛型、类型收窄、Vue 组件类型 | Vue 项目无 `any` 泛滥 |
| Vue 3 | 无 | 组件、props/emits、路由、Pinia、API 集成 | 交付 P2 前端 |
| 数据库 | SQL 基础 | 数据建模、索引、事务、ORM、迁移 | 设计并迁移 P2 数据库 |
| 测试 | 无 | pytest、TestClient、fixtures、前端 Vitest | 核心路径有自动化测试 |
| 部署 | Docker 基础 | Dockerfile、compose、反向代理、健康检查 | P2/P3 一键启动 |
| AI/RAG | 概念 | LLM API、工具调用、RAG、评估、流式输出 | 交付 P4/P5 |

## 3. 总体路线

| 阶段 | 主题 | 主要产出 | 预计 |
| --- | --- | --- | --- |
| S0 | 基础补全 | 能解释 HTTP、写出静态页、用 Git/Docker/SQL 完成小任务 | 3–4 周 |
| S1 | FastAPI 后端基础 | 带校验、错误处理、依赖注入的 API | 4–5 周 |
| S2 | Vue 前端基础 | 能调用 API 的管理界面 | 3–4 周 |
| S3 | 全栈进阶 | 数据库、鉴权、异步、测试、部署 | 5–6 周 |
| S4 | 全栈实战 | P2 实验室数据管理、P3 任务看板 | 5–6 周 |
| S5 | AI/RAG 方向 | P4 文献 RAG、P5 生物信息 Agent | 4–6 周 |

按每周 8 小时估算，核心路径（S0–S4）约 5–6 个月；加上 S5 约 7–8 个月。时间可压缩或拉长，但**阶段顺序不要跳**。

### 依赖关系

```text
计算机/HTTP 基础 ─┐
HTML/CSS/JS 基础 ─┼─> Vue 基础 ──> Vue 进阶 ──┐
Python 补课 ──────┴─> FastAPI 基础 ─> FastAPI 进阶 ─> 全栈实战
                                                   │
                                                   └─> AI/RAG 服务
```

## 4. 详细章节计划

状态图例：`已发布`、`草稿`、`待写`、`待重写`、`按需`。

### 4.1 计算机与必要基础

定位：**够用即可**。目标是看懂 Web 开发中遇到的名词和故障，不追求科班深度。

| # | 章节 | 前置 | 学完能做什么 | 不写什么 | 主要参考 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | 程序如何运行 | 无 | 解释 CPU、内存、进程、线程、阻塞 | 指令流水线细节 | 《计算机科学导论》第 1/5/7 章 | 3h | 待写 |
| C2 | 网络如何工作 | C1 | 解释 IP、端口、DNS、TCP/UDP、TLS | 协议报文逐字段实现 | 《计算机科学导论》第 6 章、MDN | 4h | 待写 |
| C3 | HTTP 与 HTTPS | C2 | 看懂请求响应、方法、状态码、头、Cookie、缓存、CORS | 不讲所有 RFC 细节 | MDN、前端书第 1 章 | 5h | 待写 |
| C4 | 浏览器如何渲染页面 | C3 | 解释 URL→DNS→TCP→HTTP→HTML/CSS/JS→渲染 | 渲染引擎源码 | MDN、前端书 | 3h | 待写 |
| C5 | Linux 生存技能 | 无 | 文件/权限/进程/端口/环境变量/日志排障 | systemd 深度、内核参数 | 现有 Linux 笔记 | 3h | 按需 |
| C6 | Git 协作 | 无 | 分支、PR、冲突、rebase vs merge、提交规范 | Git 内部对象模型 | 官方文档 | 3h | 按需 |
| C7 | Docker 与容器化 | C5 | Dockerfile、卷、网络、compose、健康检查 | K8s、Swarm | 官方文档 | 5h | 按需 |
| C8 | SQL 与数据建模 | 无 | 主键/外键、索引、JOIN、事务、迁移 | 查询优化器原理 | 官方文档、现有 SQL 笔记 | 5h | 按需 |
| C9 | 调试与可观测性 | C3/C5 | 用日志、curl、DevTools、栈追踪定位问题 | APM 平台深度 | 官方文档 | 3h | 待写 |
| C10 | Web 安全基础 | C3 | 密码哈希、JWT、CORS、XSS/CSRF/SQL 注入防护 | 渗透测试 | OWASP Cheat Sheet | 4h | 待写 |

### 4.2 Python 补课（按需）

定位：**不重写 Python 基础主线**。只补 FastAPI 会用到的语言特性，已有章节补 Web 例子，不重复造轮子。

| # | 主题 | 对应现有章节 | 学完能做什么 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- |
| PY1 | 类型注解 | `python-basics/intermediate/type-hints.md` | 给函数、容器、可选值写准确类型 | 2h | 按需 |
| PY2 | 装饰器与闭包 | `decorators.md` | 看懂 `@app.get`、`@router.post` | 3h | 按需 |
| PY3 | 上下文管理器 | `context-manager.md` | 管理数据库 session、文件、锁 | 2h | 按需 |
| PY4 | 迭代器与生成器 | `iterators-generators.md` | 流式响应、分页、懒加载 | 3h | 按需 |
| PY5 | 面向对象 | `oop.md` | 模型、服务层、依赖对象 | 3h | 按需 |
| PY6 | 并发模型 | `concurrency.md` | 区分线程、进程、async 的适用场景 | 4h | 按需 |
| PY7 | 包与项目结构 | `beginner/uv.md` | `pyproject.toml`、依赖锁定、分层目录 | 3h | 按需 |

### 4.3 Web 后端（FastAPI）

定位：站点现有「Web 开发」主线，聚焦 API 设计与后端工程。HTTP 原理归 C3，本章只讲 API 视角。

#### 入门

| # | 章节 | 前置 | 学完能做什么 | 不写什么 | 主要参考 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| W1 | HTTP 与 API 基础 | C3 | 用 curl 调通 GET/POST/PUT/DELETE | 不重复 C3 全表 | 现有 `http-basics.md` | 4h | 已发布 |
| W2 | 第一个 FastAPI 应用 | W1 | 启动服务、打开 `/docs`、自动重载 | 不讲部署 | 现有 `first-app.md` | 3h | 已发布 |
| W3 | 路由与参数 | W2 | 路径参数、查询参数、`Path`/`Query`、`APIRouter` | 不讲数据库 | 现有 `routing.md` | 4h | 已发布 |
| W4 | 请求体与 Pydantic 模型 | W3 | 用 `BaseModel` 接收/校验 JSON | 不讲 ORM | FastAPI Body/Pydantic 官方文档 | 5h | 待写 |
| W5 | 响应模型与状态码 | W4 | `response_model`、状态码、204/201 | 不讲缓存 | FastAPI 官方文档 | 4h | 待写 |
| W6 | 错误处理与统一响应 | W4 | `HTTPException`、异常处理器、错误契约 | 不讲监控平台 | FastAPI 官方文档 | 4h | 待写 |
| W7 | 依赖注入基础 | W3 | `Depends`、可复用依赖、测试替换 | 不讲复杂 DI 框架 | FastAPI 官方文档 | 4h | 待写 |
| W8 | 项目结构与配置 | W6/W7 | 分层目录、`Settings`、环境变量、日志 | 不讲微服务 | FastAPI 官方文档、《Building Generative AI Services with FastAPI》第 2 章 | 5h | 待写 |

#### 进阶

| # | 章节 | 前置 | 学完能做什么 | 不写什么 | 主要参考 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| W9 | 数据库与 ORM | W8/C8 | SQLAlchemy/SQLModel、session、Alembic 迁移 | 不讲分库分表 | 官方文档 | 8h | 待写 |
| W10 | 认证与授权 | W9/C10 | OAuth2 密码流、JWT、密码哈希、权限范围 | 不讲 SSO 全家桶 | FastAPI Security 文档 | 6h | 待写 |
| W11 | 异步与并发 | W7/PY6 | async 视图、阻塞调用、后台任务、线程池 | 不讲 GIL 源码 | FastAPI 官方文档 | 6h | 待写 |
| W12 | 中间件、CORS 与请求追踪 | W8 | 请求 ID、日志、CORS、耗时统计 | 不讲网关 | FastAPI/Starlette 文档 | 4h | 待写 |
| W13 | 文件上传、下载与流式响应 | W11 | 上传、临时文件、`StreamingResponse`、SSE | 不讲对象存储 SDK 全家桶 | FastAPI 官方文档 | 5h | 待写 |
| W14 | 测试 | W9 | pytest + `TestClient`/httpx、fixtures、依赖覆盖、测试库 | 不讲压测 | pytest/FastAPI 文档 | 6h | 待写 |
| W15 | 性能与缓存 | W9 | 分页、索引、N+1、Redis 缓存 | 不讲分布式缓存集群 | 官方文档 | 5h | 待写 |
| W16 | 部署 | W8/C7 | uvicorn/gunicorn、Docker、反向代理、健康检查 | 不讲 K8s | 官方文档 | 6h | 待写 |
| W17 | API 设计与版本化 | W5/W6 | REST、OpenAPI、错误契约、幂等、版本策略 | 不讲 GraphQL | 官方文档、50+ App Features | 5h | 待写 |

#### 实战

| # | 项目 | 覆盖章节 | 验收标准 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- |
| W-P1 | 序列分析 API | W1–W9、W11、W14、W16 | 上传 FASTA，返回长度/GC/ORF；后台任务；测试；Docker 启动 | 14h | 待写 |
| W-P2 | 实验室数据管理 API | W4–W10、W12、W14、W15 | 样本/实验 CRUD、搜索分页、JWT、迁移、测试 | 18h | 待写 |
| W-P3 | 任务看板 API | W11、W13、W15 | 提交任务、轮询状态、结果下载、SSE 进度 | 14h | 待写 |

### 4.4 前端开发（Vue）

定位：**新主线**。目标是能配合 FastAPI 做管理后台和数据看板，不追求前端工程师深度。建议在站点新增「前端开发」主线，避免把 Web 后端章节撑得过大。

#### 入门

| # | 章节 | 前置 | 学完能做什么 | 不写什么 | 主要参考 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F1 | 前端三件套与 DevTools | C4 | 说清 HTML/CSS/JS 分工，会用 Elements/Console/Network | 不讲渲染引擎 | 前端书第 1 章 | 3h | 待写 |
| F2 | HTML 结构与语义 | F1 | 表单、列表、链接、图片、语义标签、可访问性 | 不讲所有废弃标签 | 前端书第 2 章 | 4h | 待写 |
| F3 | CSS 基础与布局 | F2 | 盒模型、选择器、Flex、Grid、响应式 | 不讲复杂动画 | 前端书第 3 章 | 6h | 待写 |
| F4 | JavaScript 基础 | F2 | 类型、函数、数组/对象、DOM、事件、fetch/async | 不讲原型链源码 | 前端书第 4 章 | 8h | 待写 |
| F5 | TypeScript 基础 | F4 | 接口、泛型、类型收窄、tsconfig | 不讲类型体操 | 官方文档 | 6h | 待写 |
| F6 | Vue 3 基础 | F4/F5 | 模板、响应式、指令、组件、props/emits、表单 | 不讲 SSR | Vue 官方文档 | 8h | 待写 |

#### 进阶

| # | 章节 | 前置 | 学完能做什么 | 不写什么 | 主要参考 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F7 | Vue Router 与 Pinia | F6 | 路由、嵌套、守卫、全局状态 | 不讲微前端 | Vue 官方文档 | 6h | 待写 |
| F8 | 前端工程化 | F6 | Vite、npm/pnpm、ESLint/Prettier、环境变量、代理 | 不讲打包器源码 | Vite 官方文档 | 5h | 待写 |
| F9 | 前后端集成 | F7/F8/W5 | fetch/axios、loading/error、分页、鉴权、上传、SSE | 不讲 GraphQL | 官方文档 | 6h | 待写 |
| F10 | 前端测试与可访问性 | F9 | Vitest、Vue Test Utils、Playwright 基础、a11y | 不讲视觉回归平台 | 官方文档 | 6h | 待写 |

#### 实战

| # | 项目 | 覆盖章节 | 验收标准 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- |
| F-P2 | 实验室数据管理界面 | F1–F9 | 登录、列表、搜索、分页、表单校验、错误提示 | 18h | 待写 |
| F-P3 | 任务提交与结果看板 | F7–F9 | 提交任务、轮询/SSE、结果展示、下载 | 14h | 待写 |
| F-P4 | RAG 聊天界面 | F7–F9 | 会话列表、流式消息、引用展示 | 12h | 待写 |

### 4.5 AI Agent 与 RAG

定位：在完成 Web 全栈基础后进入，重点是把 AI 能力做成**可部署的服务**，而不是只调 API。

#### 入门

| # | 章节 | 前置 | 学完能做什么 | 不写什么 | 主要参考 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | LLM API 基础 | W4 | chat、tokens、temperature、streaming、成本 | 不讲模型训练 | 官方文档 | 4h | 待写 |
| A2 | Prompt 结构与评测 | A1 | system/user/assistant、few-shot、结构化输出、评测集 | 不讲 Prompt 玄学 | 官方文档 | 4h | 待写 |
| A3 | 工具调用 | A2 | function calling、参数校验、错误重试 | 不讲多 Agent 框架 | 官方文档 | 5h | 待写 |
| A4 | RAG 基础 | A2/W9 | chunking、embedding、向量库、检索 | 不讲向量索引实现 | 官方文档 | 6h | 待写 |
| A5 | Agent 循环 | A3 | plan/act/observe、memory、guardrails | 不讲自主演化 | AI Agent 书籍 | 6h | 待写 |

#### 进阶

| # | 章节 | 前置 | 学完能做什么 | 不写什么 | 主要参考 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A6 | RAG 进阶 | A4 | hybrid search、rerank、citation、评估 | 不讲大规模索引集群 | 官方文档 | 8h | 待写 |
| A7 | Agent 工程 | A5/W11 | tool registry、状态机、超时/重试、可观测性 | 不讲多 Agent 编排平台 | AI Agent 书籍 | 8h | 待写 |
| A8 | 安全与成本 | A1/A7 | prompt injection、PII、限流、缓存 | 不讲合规认证 | OWASP LLM Top 10 | 5h | 待写 |

#### 实战

| # | 项目 | 覆盖章节 | 验收标准 | 预计 | 状态 |
| --- | --- | --- | --- | --- | --- |
| A-P4 | 文献 RAG 助手 | A1–A8、W13、F9 | PDF 入库、引用、流式回答、Vue 界面 | 20h | 待写 |
| A-P5 | 生物信息工具 Agent | A3–A8、W10/W13 | 序列统计、SQL 查询、BLAST 工具、审计日志 | 24h | 待写 |

## 5. 实战项目阶梯

项目按“能独立跑起来 → 能测试 → 能部署 → 能扩展”递进。每个项目都要有 README、启动命令、测试和健康检查。

| 项目 | 技术栈 | 核心功能 | 验收标准 | 对应章节 |
| --- | --- | --- | --- | --- |
| P0 序列统计 CLI | Python | 读取 FASTA，统计长度/GC/ORF | 命令行可运行，有测试 | Python 实战 |
| P1 序列分析 API | FastAPI | 上传 FASTA，后台计算，查询结果 | Docker 启动，`/docs` 可调，测试通过 | W1–W9、W11、W14、W16 |
| P2 实验室数据管理 | FastAPI + Vue + SQL | 样本/实验 CRUD、登录、搜索、分页 | 前后端联调，迁移可重复，核心路径有测试 | W4–W10、W12、W14/F1–F9 |
| P3 任务看板 | FastAPI + Vue + Redis | 提交任务、进度、结果下载、SSE | 长任务不阻塞，进度可见，失败可重试 | W11、W13、W15/F7–F9 |
| P4 文献 RAG | FastAPI + Vue + 向量库 | PDF 入库、检索、引用、流式回答 | 回答带引用，评测集可跑 | A1–A8、W13/F9 |
| P5 生物信息 Agent | FastAPI + Vue + 工具集 | 序列统计、SQL、BLAST 工具调用 | 工具有权限与审计，失败有兜底 | A3–A8、W10/W13 |

### 生物信息场景建议

- 序列：FASTA/FASTQ 解析、GC 含量、ORF 预测、引物检查。
- 数据：样本/实验/测序批次管理，结果文件与元数据关联。
- 分析：把常用脚本包装成任务 API，前端展示进度和结果。
- 文献：PDF 入库、按基因/疾病检索、回答带页码/段落引用。
- 工具：把 BLAST、比对、统计脚本注册成 Agent 工具，加超时和审计。

## 6. 参考书使用映射

> 只按目录和概念映射，不复制原文。书的版本、代码可能与当前依赖不一致，示例以官方文档和本仓库代码为准。

| 书籍 | 主要用途 | 对应章节 | 使用方式 |
| --- | --- | --- | --- |
| 《计算机科学导论（第 4 版）》 | 计算机组成、网络、操作系统概念 | C1/C2/C5 | 读第 1、5、6、7 章的概念和图，转成 Web 排障语言 |
| 《HTML、CSS 和 JavaScript 入门经典（第 2 版）》 | HTML/CSS/JS 入门 | F1–F4 | 用章节顺序搭骨架，示例改成 Vue 项目里的小页面 |
| 《HTML, CSS, JavaScript All-in-One For Dummies》 | HTML 表单/可访问性、CSS 布局、JS DOM | F2–F4/F10 | 查漏补缺，重点看表单、盒模型、选择器、事件 |
| 《Learning Python（第 6 版）》 | Python 语法与对象模型查漏 | PY1–PY5 | 当参考手册，不按书从头读 |
| 《流畅的 Python（第 2 版）》 | 数据模型、函数、OOP、迭代器、并发、async | PY2–PY6/W11 | 重点读第 1–10、17–21 章，补 Web 场景例子 |
| 《Python 面向对象编程（第 4 版）》 | 类、继承、组合、设计取舍 | PY5/W8 | 选读，服务于服务层与模型设计 |
| 《Python 数据结构与算法分析（第 2 版）》 | 复杂度、栈/队列/链表、递归、排序/查找 | C1/C9 | 选读第 2–6 章，够看懂性能问题即可 |
| 《Building Generative AI Services with FastAPI》 | FastAPI 项目结构、类型安全、模型服务、后台任务、流式、部署 | W8–W17/A-P4 | 重点读第 2–4 章及服务化章节，示例改写为自己的项目 |
| 《AI Agents in Action》 | Agent 模式、工具、记忆、评估 | A3–A7 | 提取模式，不照搬框架代码 |
| 《Building Applications with AI Agents》 | Agent 应用架构与工程化 | A5–A8 | 对照项目设计检查表 |
| 《AI Agent 开发与应用》 | 中文 Agent 案例与 LangChain/LlamaIndex 概念 | A3–A7 | 当案例目录，选与生物信息接近的场景 |
| 《50+ App Features with Python》 | 功能清单：认证、通知、性能、部署、安全、测试 | W10/W14/W16/P2/P3 | 当验收清单，逐项决定要不要做 |
| 菜鸟教程 | 主题清单 | 全部 | 只用来查“是否漏了某个入门主题”，事实以官方文档为准 |

> 私有仓库只降低曝光，不改变版权。可以加大参考力度（精读、提炼、对照、设计练习），但不要整段复制正文、代码清单、图表或习题原文。公司/机构实例还要遵守内部资料政策；生物信息示例一律使用合成数据。

## 7. 站点结构与迁移

### 目标结构

```text
docs/
├── python-basics/           # 保留，补 Web 相关例子
├── computer-fundamentals/   # 拆章：C1–C10
├── web-development/         # 后端：W1–W17 + W-P1–P3
├── frontend/                # 新增主线：F1–F10 + F-P2–P4
├── ai-agent-rag/            # 拆章：A1–A8 + A-P4–P5
├── roadmap.md
├── cheatsheet.md
└── interview.md
```

### 现有页面处理

| 现有页面 | 处理 |
| --- | --- |
| `python-basics/beginner/*` | 保留；把 10–20 行的 stub 补到 80 行以上；统一模板 |
| `python-basics/intermediate/*` | 保留；补 FastAPI/Web 相关例子；与 PY1–PY7 互相链接 |
| `python-basics/beginner/environment.md` / `conda.md` / `uv.md` | 划边界：解释器 vs conda vs uv，避免重复 venv/pip 基础 |
| `web-development/beginner/*` | 保留已发布 3 章，继续 W4–W8 |
| `web-development/intermediate.md` | 拆成 W9–W17 后删除单页 |
| `web-development/practical.md` | 改为 W-P1–P3 项目入口 |
| `ai-agent-rag/*.md` | 拆成 A1–A8 章节 |
| `computer-fundamentals/*.md` | 拆成 C1–C10 章节 |
| `*/interview.md` | 重构为 H2 主题分组 + H3 问题，禁止 H1 直接跳 H3 |

### 导航调整

- 新增顶层主线「前端开发（Vue）」，放在「Web 开发」之后。
- Web 开发描述改为「FastAPI 后端与 API 设计」，避免和前端混淆。
- 侧边栏按「入门 / 进阶 / 实战 / 面试」分组，章节数超过 8 个时默认折叠。
- 路线图页增加 S0–S5 阶段和项目阶梯。

## 8. 写作规范

每一章都遵守同一契约：

1. **一个 H1**；H2 固定为：目标、前置、知识点、示例、练习、复习要点、扩展阅读。面试页用 H2 分组、H3 列问题。
2. **80–150 行**；低于 80 行说明没讲透，高于 150 行考虑拆章。
3. **一个可运行示例**；优先来自 `main.py` 或本章独立最小项目。
4. **2–3 个坑**；写“为什么会错、怎么发现、怎么修”。
5. **1–3 道练习**；至少一道需要改代码并观察响应。
6. **代码块标注语言**；命令可直接复制运行，注明测试过的版本。
7. **不复制书/教程原文**；用自己的话重写，事实链接官方文档。
8. **不重复**；同一主题只在一个章节主讲，其他章节链接过去。
9. **移动端可读**；表格不超宽，长命令用反斜杠换行。

## 9. 执行节奏与验收

### 每周节奏（建议 6–8 小时）

- 2 小时：读一章 + 跑示例。
- 2 小时：改示例 / 做练习。
- 2 小时：写对应文档章节。
- 1–2 小时：项目推进 + 提交。

原则：**学一章、跑一章、写一章**。文档跟着真实学习进度走，不先写“想象中的知识”。

### 里程碑

| 里程碑 | 验收标准 |
| --- | --- |
| M0 基础补全 | 能解释 HTTP 请求响应；写出带表单的静态页；用 Docker 跑起一个服务 |
| M1 FastAPI 入门 | 能写带 Pydantic 校验、错误处理、依赖注入的 API，并有 `/docs` |
| M2 Vue 入门 | 能写一个调用 API 的列表 + 表单页面，处理 loading/error |
| M3 全栈进阶 | 完成登录、数据库迁移、分页搜索、核心路径测试 |
| M4 全栈实战 | P2/P3 可 Docker 启动，有 README、测试、健康检查 |
| M5 AI/RAG | P4/P5 可演示，回答带引用/工具有审计 |

### 章节状态维护

每完成一章，更新本文件的「状态」列，并在章节末尾加：

- 测试过的依赖版本
- 对应项目/练习
- 参考的官方文档链接

## 10. 风险与取舍

| 风险 | 表现 | 对策 |
| --- | --- | --- |
| 范围蔓延 | 想同时学前端、AI、K8s、算法 | 按阶段推进；前端只到 Vue 管理界面；CS 只到 Web 够用 |
| 教程地狱 | 看完很多课，写不出项目 | 每章必须有可运行产物；以项目验收代替“看完” |
| 复制粘贴 | 文档风格混乱、版权风险 | 书只读目录和概念；正文重写；示例用自己的项目 |
| 版本漂移 | 书里的代码跑不通 | 以官方文档为准；章节记录测试版本 |
| AI 依赖 | 生成代码看不懂、测试缺失 | 关键代码手写；每章至少一个测试；AI 只做辅助 |
| 完美主义 | 一章改很久，进度停滞 | 先到 80 行可发布，再迭代；状态列记录“待重写” |

## 11. 私有 GitLab 迁移建议

### 11.1 对内容策略的影响

私有仓库只降低曝光，不改变版权。可以加大参考力度，但边界要清楚：

- **可以**：按章节精读、提炼观点、做概念对照表、借鉴章节顺序、把书里的练习改写成自己的题目。
- **谨慎**：短引用 1–2 句关键定义，并标注书名、章节；公司/实验室仓库中同事可见也算分发，先看内部资料政策。
- **不要**：整段/整章复制、代码清单原样搬运、图表扫描件、习题原文、把 EPUB/PDF 提交进仓库或发布到 Pages。
- **数据**：生物信息示例一律用合成数据；真实样本、患者数据、未公开结果不进 Git、不进 Pages。

建议每章保留一段“来源与差异”笔记，既方便回溯，也能避免无意识复制：

```text
来源：书名 / 章节
我读到的核心点（自己的话）：
我的例子（本仓库代码）：
与官方文档的差异 / 版本注意：
```

### 11.2 GitLab CI 与 Pages

GitLab 用 `pages` job 发布静态站点，构建产物必须放到 `public/`。下面是一个可直接改用的最小配置：

```yaml
image: node:24

variables:
  GIT_DEPTH: "0"          # lastUpdated 需要完整 git 历史

cache:
  key:
    files:
      - package-lock.json
  paths:
    - .npm/

stages:
  - deploy

pages:
  stage: deploy
  script:
    - npm ci --cache .npm --prefer-offline
    - |
      if [ -z "${BASE_PATH:-}" ] && [ -n "$CI_PAGES_URL" ]; then
        export BASE_PATH="$(node -e 'const u=new URL(process.env.CI_PAGES_URL); console.log(u.pathname.replace(/\/$/,"") || "/")')"
      fi
      npm run docs:build
    - rm -rf public
    - mv docs/.vitepress/dist public
  artifacts:
    paths:
      - public
    expire_in: 1 week
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      changes:
        - docs/**/*
        - .gitlab-ci.yml
        - package.json
        - package-lock.json
```

要点：

- `GIT_DEPTH: "0"`：否则 `lastUpdated` 只能看到浅克隆历史。
- `CI_PAGES_URL`：Pages job 里可用，按它的路径自动推导 `BASE_PATH`；项目页是 `/project`，自定义域名通常是 `/`。
- 自定义域名：如果 `CI_PAGES_URL` 仍是默认 Pages 地址，建议在 GitLab CI/CD Variables 里显式设置 `BASE_PATH=/`。
- `GIT_DEPTH`、`BASE_PATH` 等变量可在 `Settings → CI/CD → Variables` 里配置，敏感值用 masked/protected。
- 不需要 `.nojekyll`；保留也无害。
- 如果同时保留 GitHub，`.github/workflows/deploy.yml` 和 `.gitlab-ci.yml` 可以共存，但两边都要维护；迁移完成后建议只保留一套，避免部署结果不一致。

### 11.3 访问控制与手机阅读

- **不要假设“私有项目 = 私有 Pages”**。GitLab Pages 的访问控制取决于版本、套餐和实例配置；在 `Settings → Pages` 确认 Pages 可见性，并确认未登录用户是否真的访问不到。
- 如果 Pages 无法限制到项目成员：
  - 把站点拆成“公开书”和“私有实验笔记”两个仓库；
  - 或只在公司内网/VPN/Tailscale 后访问自建 Pages；
  - 或把敏感内容留在 GitLab Wiki/内部文档，不发布到 Pages。
- 手机阅读需要登录时，优先用 SSO；如果每次登录太麻烦，考虑把**非敏感**知识库保留为公开站点，私有内容单独存放。
- 自定义域名：在 `Settings → Pages → New domain` 配置 DNS，GitLab 可自动申请 Let's Encrypt 证书；证书生效后再切换手机书签。
- 真实数据合规：私有化部署不等于合规。涉及人类遗传数据、临床数据时，按机构/伦理/法规要求处理，示例全部脱敏或合成。

### 11.4 迁移清单

1. 新建 GitLab 项目，用 `git push --mirror` 推送所有分支和标签，保留 `lastUpdated` 所需历史。
2. 更新 `docs/.vitepress/config.mts` 里的 `repo`、`editLink`、`socialLinks`，以及 README 中的 GitHub 地址。
3. 新增 `.gitlab-ci.yml`，确认 `pages` job 产出 `public/`。
4. 在 GitLab 设置 Pages 可见性、自定义域名和 CI/CD Variables。
5. 手机端重新验证：登录、深色模式、搜索、404、代码块滚动。
6. 确认 `raw_document/` 没有被跟踪：`git ls-files raw_document` 应为空。
7. 如果保留 GitHub 镜像，明确哪边是主仓库，避免两边内容分叉。

## 12. 下一步（两周内）

1. 按本计划新增「前端开发」主线骨架：`docs/frontend/index.md` + `beginner/` 目录 + 侧边栏。
2. 完成 Web 入门 W4–W6：请求体与 Pydantic、响应模型、错误处理。
3. 开始 C3「HTTP 与 HTTPS」，作为 Web 入门的前置阅读。
4. 修 7 个标题结构有问题的页面（3 个面试页、3 个总览页、`first-program.md`）。
5. 每个新章节按第 8 节契约写，写完更新本文件状态列。

> 目标不是把书搬上网站，而是把“自己学会并能做出来”的东西写成可复习的章节。
