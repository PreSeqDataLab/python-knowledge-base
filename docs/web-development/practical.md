# Web 开发 · 实战

## 目标

把示例 API 做成可交付服务：结构清晰、错误可控、日志可查、部署可重复。

## 知识点

- 状态码语义：`201` 创建成功、`204` 无内容、`422` 校验失败。
- 异常处理：用 `HTTPException` 或自定义异常处理器统一响应结构。
- 配置管理：环境变量 + `.env`，不把密钥写进代码。
- 测试：用 `TestClient` 覆盖成功、校验失败、鉴权失败三类路径。

## 示例：统一错误结构

```python
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"code": exc.status_code, "message": exc.detail},
    )
```

## 部署清单

1. 依赖显式锁定：`pip freeze > requirements.txt`。
2. 启动命令不开启 `--reload`。
3. 健康检查接口可用，例如 `GET /health`。
4. 日志输出包含时间、级别、请求路径。
5. 域名与 HTTPS 配置完成。

## 练习

1. 为当前 `main.py` 增加 `GET /health`。
2. 用 `TestClient` 写三个测试：根目录、创建条目、参数校验失败。
3. 给 `DELETE /admin/items/{item_id}` 返回 `204` 并验证响应体为空。

> 运行 `TestClient` 需要先安装 `httpx`：`pip install httpx`。

## 复习要点

- 先让接口语义正确，再优化性能。
- 异步视图里不要混用阻塞调用。
- 部署问题优先看：端口、进程、日志、健康检查。
