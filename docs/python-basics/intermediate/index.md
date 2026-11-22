# Python 基础 · 进阶

> 结构参考 [菜鸟教程 Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)，正文为原创整理。

## 目标

- 能用函数、模块和类组织中等规模代码。
- 能读懂 lambda、装饰器、生成器与上下文管理器。
- 能处理异常、使用标准库并完成基础文本处理。

## 章节

- [函数与 lambda](functions.md)
- [装饰器](decorators.md)
- [迭代器与生成器](iterators-generators.md)
- [上下文管理器](context-manager.md)
- [模块与 __name__](modules.md)
- [错误与异常](exceptions.md)
- [面向对象](oop.md)
- [类型注解](type-hints.md)
- [标准库](stdlib.md)
- [并发模型](concurrency.md)

## 示例：解析配置文件

```python
import json
from pathlib import Path

config = json.loads(Path("config.json").read_text(encoding="utf-8"))
debug = config.get("debug", False)
print("debug mode:", debug)
```

## 练习

1. 把词频脚本封装成类，支持替换分词策略。
2. 用生成器实现一个大文件的逐行处理，避免一次性读入内存。
3. 写一个带缓存的装饰器，并说明缓存键如何设计。
4. 用 `json` 保存和读取程序配置。

## 复习要点

- 装饰器是高阶函数，`wraps` 保留元信息。
- 生成器惰性求值，适合流式处理。
- `with` 依赖上下文管理协议。
- `__name__` 用于区分“直接运行”和“被导入”。
- 异常应按类型捕获，避免吞错。
- 优先用标准库解决问题，再考虑第三方依赖。
