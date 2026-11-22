# Web 开发 · 入门

## 目标

- 理解一次 HTTP 请求包含什么。
- 能启动 FastAPI 服务并访问交互文档。

## 知识点

### HTTP 请求与响应

```text
请求：方法 + URL + 请求头 + 请求体
响应：状态码 + 响应头 + 响应体
```

常见方法：`GET` 查询、`POST` 创建、`PUT` 全量更新、`PATCH` 局部更新、`DELETE` 删除。

### 第一个应用

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}
```

启动：

```bash
uvicorn main:app --reload --port 8001
```

访问：
- 业务接口：`http://127.0.0.1:8001/`
- Swagger 文档：`http://127.0.0.1:8001/docs`
- OpenAPI JSON：`http://127.0.0.1:8001/openapi.json`

## 示例：路径参数与查询参数

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

访问 `/items/42?q=demo`，FastAPI 自动完成类型转换与校验。

## 练习

1. 给应用增加 `GET /health`，返回 `{"status": "ok"}`。
2. 用浏览器打开 `/docs`，执行一次带查询参数的请求。
3. 故意传 `item_id=abc`，观察 `422` 响应内容。

## 复习要点

- `uvicorn main:app` 中 `main` 是模块名，`app` 是 FastAPI 实例名。
- `--reload` 仅用于开发。
- 类型注解既是文档也是运行时校验依据。
