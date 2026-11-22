# Python 基础 · 实战

## 目标

交付一个可维护的 CLI 工具：能读文件、做统计、输出报告、写日志，并能被安装复用。

## 知识点

- `argparse`：定义命令行参数与帮助信息。
- `pathlib`：跨平台路径处理。
- `logging`：分级日志，替代 `print` 调试。
- `pyproject.toml`：声明依赖与脚本入口。

## 示例：目录统计工具

```python
# wordcount_cli.py
import argparse
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")

def count_lines(path: Path) -> int:
    if not path.is_file():
        raise FileNotFoundError(path)
    with path.open(encoding="utf-8") as f:
        return sum(1 for _ in f)

def main() -> None:
    parser = argparse.ArgumentParser(description="统计文件行数")
    parser.add_argument("path", type=Path, help="要统计的文件")
    parser.add_argument("-o", "--output", type=Path, help="结果输出文件")
    args = parser.parse_args()

    total = count_lines(args.path)
    result = f"{args.path}: {total} lines"
    logging.info(result)
    if args.output:
        args.output.write_text(result, encoding="utf-8")

if __name__ == "__main__":
    main()
```

安装为命令：

```toml
[project.scripts]
wordcount = "wordcount_cli:main"
```

## 练习

1. 支持传入目录，递归统计所有 `.py` 文件。
2. 增加 `--exclude` 参数跳过指定模式。
3. 给 `count_lines` 写单元测试，覆盖文件不存在与空文件。

## 复习要点

- 参数解析、路径处理、日志、异常信息是 CLI 工具的四件套。
- 文件路径一律用 `pathlib` 字符串拼接会漏掉平台差异。
- 主逻辑放进函数，`if __name__ == "__main__"` 只做入口。
