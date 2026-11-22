# Python 基础 · 进阶 · 面向对象

## 8. 面向对象与数据模型

```python
from dataclasses import dataclass

@dataclass
class Item:
    name: str
    price: float = 0.0

    def discounted(self, rate: float) -> float:
        return self.price * (1 - rate)
```

类封装状态与行为。`@dataclass` 减少样板代码；需要输入校验时用 Pydantic。

