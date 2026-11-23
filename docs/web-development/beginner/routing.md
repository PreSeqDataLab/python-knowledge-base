# 路由与参数

> FastAPI 用装饰器把“方法 + 路径”映射到函数，再从函数签名推断参数从哪里来。

## 目标

- 区分路径参数和查询参数。
- 用 `Path`、`Query` 添加类型、默认值和范围校验。
- 理解路由匹配顺序，避免静态路径被动态路径吃掉。
- 用 `APIRouter` 给路由加前缀并分组。

## 路径参数

路径中带 `{}` 的片段会被注入同名函数参数：

```python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```

- `item_id` 出现在路径里，所以是路径参数。
- 声明为 `int` 后，FastAPI 会做类型转换；转换失败返回 `422`。
- 路径参数默认必填，不能省略。

需要范围约束时用 `Path`：

```python
from fastapi import Path

@app.get("/items/{item_id}")
def read_item(item_id: int = Path(..., ge=1, description="条目 ID")):
    return {"item_id": item_id}
```

`...` 表示必填，`ge=1` 表示大于等于 1；这些约束会同时出现在 `/docs` 和校验逻辑里。

## 查询参数

不在路径里的函数参数，默认就是查询参数：

```python
@app.get("/items")
def list_items(q: str | None = None, skip: int = 0, limit: int = 10):
    return {"q": q, "skip": skip, "limit": limit}
```

对应请求：

```text
GET /items?q=demo&skip=0&limit=10
```

- 有默认值的参数可以不传。
- 允许为空时用 `str | None`，默认值写 `None`。
- 需要更细的校验时用 `Query`：

```python
from fastapi import Query

@app.get("/items")
def list_items(
    q: str | None = Query(default=None, description="搜索关键字"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=100),
):
    return {"q": q, "skip": skip, "limit": limit}
```

`limit=1000` 会直接得到 `422`，因为违反了 `le=100`。

## 组合示例：本仓库的条目查询

[main.py](https://github.com/PreSeqDataLab/python-knowledge-base/blob/main/main.py) 中同时使用了路径参数和三个查询参数：

```python
@public_router.get("/items/{item_id}")
def read_item(
    item_id: int = Path(..., ge=1, description="条目 ID"),
    q: str | None = Query(default=None, description="搜索关键字"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=100),
):
    return {"item_id": item_id, "q": q, "skip": skip, "limit": limit}
```

由于 `public_router` 带有 `prefix="/public"`，完整路径是：

```text
GET /public/items/42?q=demo&skip=0&limit=10
```

## 路由匹配顺序

Starlette 按注册顺序匹配路由。静态路径必须放在动态路径前面：

```python
# 正确：先匹配 /items/search
@app.get("/items/search")
def search_items(keyword: str):
    return {"keyword": keyword}


@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```

如果把两个装饰器调换，`/items/search` 会先匹配 `{item_id}`；由于 `item_id` 是 `int`，`search` 转换失败，返回 `422` 而不是进入搜索接口。

## 用 APIRouter 分组

当路由变多时，把同一组接口拆到 `APIRouter`：

```python
from fastapi import APIRouter, FastAPI

app = FastAPI()
public_router = APIRouter(prefix="/public", tags=["public"])
admin_router = APIRouter(prefix="/admin", tags=["admin"])


@public_router.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}


@admin_router.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int):
    return None


app.include_router(public_router)
app.include_router(admin_router)
```

- `prefix` 统一加在组内所有路径前。
- `tags` 决定 `/docs` 中的分组。
- `include_router` 可以多次调用，也可以嵌套。

## 常见误区

- 把查询参数写进路径：`/items/{q}` 会让 `q` 变成必填路径参数。
- 路径参数不写类型：`item_id: str` 会把 `42` 当字符串，失去自动转换和校验。
- 可选查询参数写成 `q: str = None`：应写 `q: str | None = None`，类型才准确。
- 静态路径放在动态路径之后，被 `{item_id}` 抢先匹配。
- 路径结尾斜杠不一致：Starlette 可能返回 `307` 重定向，调试时容易误判为 404。

## 练习

1. 增加 `GET /items/search?keyword=...`，确保它能被正确匹配。
2. 给 `limit` 加 `le=100`，分别请求 `limit=10` 和 `limit=1000`，比较响应。
3. 把示例路由拆成 `public` 和 `admin` 两个 `APIRouter`。
4. 请求 `/public/items/0`，解释为什么返回 `422`。

## 复习要点

- 路径里有同名占位符的是路径参数，其余默认是查询参数。
- `Path`、`Query` 不只是文档装饰，它们直接参与运行时校验。
- 路由按注册顺序匹配，静态路径永远放在动态路径前面。
- `APIRouter(prefix=..., tags=...)` 是组织中型项目的第一步。

## 扩展阅读

- 相关章节：[HTTP 基础](http-basics.md)、[第一个 FastAPI 应用](first-app.md)、[请求体与 Pydantic 模型](request-body.md)
- 外部文档：[FastAPI Path Parameters](https://fastapi.tiangolo.com/tutorial/path-params/)、[Query Parameters](https://fastapi.tiangolo.com/tutorial/query-params/)
