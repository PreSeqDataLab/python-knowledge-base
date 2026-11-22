# Web 开发 · 进阶

## 目标

- 用 Pydantic 模型约束输入输出。
- 用 `APIRouter` 与依赖注入组织可维护的项目。

## 知识点

### 数据模型

```python
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    tags: list[str] = Field(default_factory=list)
```

### 路由分组

```python
from fastapi import APIRouter

router = APIRouter(prefix="/public", tags=["public"])

@router.get("/items/{item_id}", name="read_item")
def read_item(item_id: int):
    return {"item_id": item_id}
```

`app.include_router(router)` 把路由挂载到应用。

### 依赖注入

```python
from fastapi import Depends, Header, HTTPException

def verify_token(x_token: str = Header(...)) -> str:
    if x_token != "secret":
        raise HTTPException(status_code=401, detail="invalid token")
    return x_token

@app.get("/secure")
def secure(token: str = Depends(verify_token)):
    return {"token": token}
```

依赖可嵌套、可复用，是鉴权、数据库连接、分页参数的首选位置。

### 异步视图

```python
@app.get("/remote")
async def remote():
    # 适合 await 网络 I/O，不要在 async def 里做阻塞 CPU 计算
    return {"ok": True}
```

## 示例：分页依赖

```python
def pagination(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": min(limit, 100)}

@app.get("/items")
def list_items(page: dict = Depends(pagination)):
    return page
```

## 练习

1. 把现有根路由迁到一个带 `tags` 的 `APIRouter`。
2. 给 `POST /public/items` 增加 Pydantic 校验并测试 `422`。
3. 写一个 `get_db` 依赖，模拟返回连接对象。

## 复习要点

- Pydantic 负责校验和序列化，`model_dump()` 转字典。
- 依赖注入降低重复代码，测试时可覆盖依赖。
- 同步 `def` 会在线程池运行，`async def` 在事件循环运行。
