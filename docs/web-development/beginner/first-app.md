# 第一个 FastAPI 应用

> 从零启动一个能访问、能看交互文档、改代码后自动重载的服务。

## 目标

- 创建虚拟环境并安装 `fastapi` 与 `uvicorn`。
- 理解 `FastAPI()` 实例、装饰器路由和 `main:app` 的含义。
- 打开 `/docs`、`/redoc`、`/openapi.json`。
- 能根据启动日志和报错定位常见问题。

## 准备环境

需要 Python 3.10+。

```bash
python -m venv .venv
source .venv/bin/activate        # macOS / Linux
# .venv\Scripts\activate         # Windows

pip install fastapi uvicorn
```

虚拟环境的创建、激活与依赖管理见 [venv 与 pip](../../python-basics/beginner/venv.md)。

使用 uv：

```bash
uv venv
source .venv/bin/activate
uv pip install fastapi uvicorn
```

本仓库根目录已有 [main.py](https://github.com/PreSeqDataLab/python-knowledge-base/blob/main/main.py) 和 `requirements.txt`，可以直接安装并运行：

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

## 最小应用

```python
from fastapi import FastAPI

app = FastAPI(title="Demo API", version="1.0.0")


@app.get("/")
def root():
    return {"message": "Hello World"}
```

逐行理解：

- `FastAPI(...)` 创建应用实例，`title` 和 `version` 会出现在 OpenAPI 文档里。
- `@app.get("/")` 把 `GET /` 注册到 `root` 函数。
- 函数返回值是普通字典，FastAPI 自动序列化为 JSON。
- 函数没有参数时，不会从请求里读取任何东西。

## 启动服务

```bash
uvicorn main:app --reload --port 8001
```

- `main`：`main.py` 的模块名，不带 `.py`。
- `app`：文件里的 FastAPI 实例变量名。
- `--reload`：监听文件变化并自动重启，只用于开发。
- `--port 8001`：指定端口；不写时默认 `8000`。

需要让同一局域网的手机访问时，监听所有网卡：

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

然后手机访问 `http://<电脑局域网 IP>:8001/docs`。

## 访问文档

服务启动后打开：

| 地址 | 作用 |
| --- | --- |
| `http://127.0.0.1:8001/` | 业务接口 |
| `http://127.0.0.1:8001/docs` | Swagger UI，可直接点 “Try it out” |
| `http://127.0.0.1:8001/redoc` | ReDoc，适合阅读 |
| `http://127.0.0.1:8001/openapi.json` | 机器可读的 OpenAPI 描述 |

`/docs` 和 `/redoc` 都是由函数签名、类型注解和 `FastAPI(...)` 元数据自动生成的。改完代码保存后，`--reload` 会重启服务，刷新页面即可看到变化。

## 示例：接入本仓库的示例服务

[main.py](https://github.com/PreSeqDataLab/python-knowledge-base/blob/main/main.py) 里除了根路由，还挂载了 `public` 和 `admin` 两组路由。简化后的核心结构如下：

```python
from fastapi import APIRouter, FastAPI

app = FastAPI(title="FastAPI 扩展示例", version="1.0.0")
public_router = APIRouter(prefix="/public", tags=["public"])


@public_router.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}


app.include_router(public_router)
```

启动后访问 `/public/items/42`，就进入了下一章要讲的路径参数。

## 常见排障

| 现象 | 常见原因 | 处理 |
| --- | --- | --- |
| `ModuleNotFoundError: No module named 'main'` | 不在项目根目录启动 | `cd` 到 `main.py` 所在目录，或使用 `--app-dir` |
| `Address already in use` | 端口被占用 | 换端口，或找出并结束占用进程 |
| 访问返回 `404` | 路径或方法不匹配 | 核对装饰器里的路径与方法，注意结尾斜杠 |
| 改代码不生效 | 没开 `--reload` 或没保存 | 开发时加 `--reload`，确认文件已保存 |
| `ModuleNotFoundError: No module named 'fastapi'` | 用错了 Python 环境 | 确认已激活 `.venv`，检查 `which python` |

## 练习

1. 增加 `GET /health`，返回 `{"status": "ok"}`。
2. 修改 `FastAPI(title=..., version=...)`，刷新 `/docs` 观察标题和版本文档变化。
3. 用 `--host 0.0.0.0` 启动，在手机上打开 `/docs` 并执行一次请求。
4. 故意把端口改成已被占用的值，读懂报错并换一个端口。

## 复习要点

- `uvicorn main:app`：`main` 是模块，`app` 是实例；两者任一写错都会启动失败。
- `--reload` 只用于开发，生产环境不要开启。
- `/docs`、`/redoc`、`/openapi.json` 免费获得，前提是写好类型注解和路由元数据。
- 排障顺序：先确认虚拟环境，再确认工作目录，最后确认端口和路径。

## 扩展阅读

- 相关章节：[HTTP 基础](http-basics.md)、[路由与参数](routing.md)
- 外部文档：[FastAPI First Steps](https://fastapi.tiangolo.com/tutorial/first-steps/)
