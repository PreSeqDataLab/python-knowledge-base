# Web 开发 · 入门

> 从一次 HTTP 请求开始，跑起第一个 FastAPI 服务，并能用路由和参数接住请求。

## 目标

- 说清一次 HTTP 请求和响应分别由什么组成。
- 独立创建环境、安装依赖、启动 FastAPI 服务。
- 用路径参数和查询参数写出可校验的接口。
- 能定位 404、422、端口占用等入门问题。

## 章节

| 顺序 | 章节 | 解决什么问题 |
| --- | --- | --- |
| 1 | [HTTP 基础](beginner/http-basics.md) | 看懂请求方法、状态码、请求头和响应体 |
| 2 | [第一个 FastAPI 应用](beginner/first-app.md) | 从零启动服务，打开 `/docs` 并自动重载 |
| 3 | [路由与参数](beginner/routing.md) | 用路径参数、查询参数和 `APIRouter` 接住请求 |
| 4 | [请求体与 Pydantic 模型](beginner/request-body.md) | 用模型接收 JSON，完成字段校验 |

后续会继续补充：响应模型、依赖注入、错误处理、中间件、数据库、测试与部署。

## 环境准备

需要 Python 3.10+（示例使用 `str | None` 写法）。

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn
```

使用 uv 也可以：

```bash
uv venv
source .venv/bin/activate
uv pip install fastapi uvicorn
```

本仓库根目录已经包含示例服务和依赖文件，可以直接运行：

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

## 学习方式

1. 先照着章节把示例跑起来，再用 `/docs` 或 `curl` 改参数观察响应。
2. 每章至少制造一次错误：非法路径参数、缺少必填查询参数、错误的方法。
3. 遇到 `422` 时先看响应体里的 `loc`、`msg`、`type`，再回去检查函数签名。

## 完成标准

- 不看资料能写出根路由、带路径参数的接口和带默认值的查询参数。
- 能解释 `200`、`201`、`204`、`400`、`401`、`403`、`404`、`422`、`500` 的使用场景。
- 能根据启动日志、`/docs` 和响应体定位常见问题。

## 复习要点

- FastAPI 的参数来源由函数签名决定：路径里的同名变量是路径参数，其余默认是查询参数。
- `uvicorn main:app` 中 `main` 是模块名，`app` 是 FastAPI 实例名。
- 类型注解同时承担三件事：编辑器提示、文档生成、运行时校验。

## 扩展阅读

- 相关章节：[Web 开发 · 进阶](intermediate.md)、[HTTP 基础](beginner/http-basics.md)
- 外部文档：[FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
