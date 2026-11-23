# 请求体与 Pydantic 模型

> 创建和更新资源时，数据放在请求体里；用 Pydantic 模型接收，校验和文档一次完成。

## 目标

- 分清路径参数、查询参数和请求体。
- 用 `BaseModel` 定义请求体结构。
- 用 `Field` 表达必填、默认值、长度和范围约束。
- 看懂 `422` 校验错误，并定位到具体字段。
- 用嵌套模型表达结构化数据。

## 前置

- [路由与参数](routing.md)
- [类型注解](../../python-basics/intermediate/type-hints.md)

## 知识点

### 怎么判断参数来自请求体

- 路径里出现的同名变量 → 路径参数。
- Pydantic 模型、`dict`、`Body(...)` → 请求体。
- 其余标量参数 → 查询参数。

因此，`POST` 接口里写 `name: str` 并不会自动变成请求体，它仍然是查询参数。要放进请求体，用模型或 `Body`。

### 定义模型

```python
from pydantic import BaseModel, Field


class Item(BaseModel):
    name: str = Field(..., min_length=1, description="名称")
    price: float = Field(..., gt=0, description="价格")
    tags: list[str] = Field(default_factory=list, description="标签")
```

- `BaseModel` 负责解析、校验和序列化。
- `Field(...)` 的 `...` 表示必填；`min_length`、`gt` 等约束同时进入运行时校验和 `/docs`。
- `default_factory=list` 每次创建实例时生成新列表，比直接写 `= []` 更明确。
- `description` 会显示在 OpenAPI 文档里。

### 接收请求体

```python
@app.post("/items", status_code=201)
def create_item(item: Item):
    return {"id": 1, **item.model_dump()}
```

- 参数类型是 `BaseModel` 子类，所以 FastAPI 从请求体读取它。
- 请求头需要 `Content-Type: application/json`。
- `item.model_dump()` 把模型转成字典，适合继续加工或返回。

### 路径、查询、请求体同时出现

```python
@app.put("/items/{item_id}")
def replace_item(item_id: int, item: Item, notify: bool = False):
    return {"item_id": item_id, "notify": notify, **item.model_dump()}
```

- `item_id` 在路径里 → 路径参数。
- `notify` 是带默认值的标量 → 查询参数。
- `item` 是 Pydantic 模型 → 请求体。

如果确实要把单个标量放进请求体，用 `Body` 显式声明，例如 `tag: str = Body(..., embed=True)`。

### 嵌套模型与额外字段

```python
class Dimensions(BaseModel):
    length_cm: float = Field(..., gt=0)
    width_cm: float = Field(..., gt=0)


class Sample(BaseModel):
    name: str = Field(..., min_length=1)
    dimensions: Dimensions
    tags: list[str] = Field(default_factory=list)
```

嵌套字段校验失败时，`422` 的 `loc` 会指向具体路径，例如 `["body", "dimensions", "length_cm"]`。

默认情况下，请求体里多出来的字段会被忽略。需要严格拒绝时，设置 `extra="forbid"`：

```python
from pydantic import ConfigDict


class StrictItem(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    price: float = Field(..., gt=0)
```

## 示例：创建条目

先启动本仓库的示例服务 `uvicorn main:app --reload --port 8001`，然后发送合法请求：

```bash
curl -i -X POST http://127.0.0.1:8001/public/items \
  -H 'Content-Type: application/json' \
  -d '{"name": "demo", "price": 9.9, "tags": ["a", "b"]}'
```

返回 `201`，响应体包含 `id`、`name`、`price`、`tags`。

再发送非法请求：

```bash
curl -i -X POST http://127.0.0.1:8001/public/items \
  -H 'Content-Type: application/json' \
  -d '{"name": "", "price": -1}'
```

返回 `422`，`detail` 中会给出 `loc`、`msg`、`type`，分别指出字段位置、错误原因和错误类型。

## 常见误区

- 以为 `POST` 里的标量参数会自动进请求体：默认仍是查询参数，要用模型或 `Body`。
- 忘记 `Content-Type: application/json`：服务端可能读不到请求体，必填字段报 `422`。
- 把可选请求体写成 `item: Item = None`：应写 `item: Item | None = None`，类型才准确。
- 直接写 `tags: list[str] = []`：Pydantic v2 会处理默认值，但 `default_factory=list` 意图更清晰。
- 以为多传字段会报错：默认忽略；需要严格校验时设置 `extra="forbid"`。
- 把 `422` 当成服务端 bug：它是正常的字段校验失败，先看 `loc` 指向哪里。

## 练习

1. 给 `Item` 增加 `description: str | None = None`，分别测试传和不传。
2. 给 `price` 加 `le=100000`，测试超出范围时的 `422`。
3. 用嵌套模型描述一个样本及其尺寸，故意传错类型，读出嵌套 `loc`。
4. 给模型加 `extra="forbid"`，测试多传字段的行为。

## 复习要点

- Pydantic 模型参数来自请求体；路径里的同名变量是路径参数，其余标量默认是查询参数。
- `Field` 的约束同时服务于运行时校验和 `/docs` 文档。
- `422` 不可怕，先看 `loc`、`msg`、`type`。
- `model_dump()` 把模型转成字典，适合继续加工或返回。

## 扩展阅读

- 相关章节：[路由与参数](routing.md)、[HTTP 基础](http-basics.md)
- 外部文档：[FastAPI Request Body](https://fastapi.tiangolo.com/tutorial/body/)、[Pydantic Models](https://docs.pydantic.dev/latest/concepts/models/)
