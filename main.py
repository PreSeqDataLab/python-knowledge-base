from fastapi import APIRouter, FastAPI, Path, Query
from pydantic import BaseModel, Field

app = FastAPI(
    title="FastAPI 扩展示例",
    description="用于观察 VS Code FastAPI 扩展的侧边栏展示",
    version="1.0.0",
)

public_router = APIRouter(prefix="/public", tags=["public"])
admin_router = APIRouter(prefix="/admin", tags=["admin"])


class Item(BaseModel):
    name: str = Field(..., description="名称")
    price: float = Field(..., gt=0, description="价格")
    tags: list[str] = Field(default_factory=list, description="标签")


@app.get("/", name="root", tags=["root"])
def root():
    return {"message": "Hello World"}


@public_router.get(
    "/items/{item_id}",
    name="read_item",
    summary="按 ID 查询条目",
    response_description="条目详情",
)
def read_item(
    item_id: int = Path(..., ge=1, description="条目 ID"),
    q: str | None = Query(default=None, description="搜索关键字"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=100),
):
    return {"item_id": item_id, "q": q, "skip": skip, "limit": limit}


@public_router.post("/items", name="create_item", status_code=201)
def create_item(item: Item):
    return {"id": 1, **item.model_dump()}


@public_router.get("/search", name="search_items")
def search_items(keyword: str = Query(..., min_length=1)):
    return {"keyword": keyword, "results": []}


@admin_router.put("/items/{item_id}", name="replace_item")
def replace_item(item_id: int, item: Item):
    return {"item_id": item_id, **item.model_dump()}


@admin_router.patch("/items/{item_id}", name="patch_item")
def patch_item(item_id: int, item: Item):
    return {"item_id": item_id, **item.model_dump()}


@admin_router.delete("/items/{item_id}", name="delete_item", status_code=204)
def delete_item(item_id: int):
    return None


app.include_router(public_router)
app.include_router(admin_router)


demo_app = FastAPI(title="第二个 FastAPI 应用（仅用于演示应用发现）")


@demo_app.get("/health", name="health_check", tags=["health"])
def health_check():
    return {"status": "ok"}


def _code_lens_demo():
    from fastapi.testclient import TestClient

    client = TestClient(app)
    client.get("/")
    client.get("/public/items/42?q=demo")
    client.post("/public/items", json={"name": "demo", "price": 9.9})
