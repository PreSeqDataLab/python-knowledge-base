# Python 基础 · 实战 · CLI 工具

> 结构参考 [菜鸟教程 Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)，正文为原创整理。

## 目标

交付一个可维护的 CLI 工具：能读文件、做统计、输出报告、写日志，并能被安装复用。

## 知识点

- `argparse`：定义命令行参数与帮助信息。
- `pathlib`：跨平台路径处理。
- `json`：读写配置文件。
- `re`：提取文本中的模式。
- `datetime`：生成时间戳和报表日期。
- `logging`：分级日志，替代 `print` 调试。
- `pyproject.toml`：声明依赖与脚本入口。

## 示例：目录统计工具

```python
# wordcount_cli.py
import argparse
import json
import logging
from datetime import datetime
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
    parser.add_argument("--config", type=Path, help="JSON 配置文件")
    args = parser.parse_args()

    config = json.loads(args.config.read_text(encoding="utf-8")) if args.config else {}
    total = count_lines(args.path)
    result = {
        "path": str(args.path),
        "lines": total,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "tag": config.get("tag", "default"),
    }
    text = json.dumps(result, ensure_ascii=False, indent=2)
    logging.info("统计完成: %s", result["path"])

    if args.output:
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text)

if __name__ == "__main__":
    main()
```

安装为命令：

```toml
[project.scripts]
wordcount = "wordcount_cli:main"
```

配置文件示例：

```json
{ "tag": "learning" }
```

运行：

```bash
python wordcount_cli.py main.py --config config.json -o report.json
```

## 练习

1. 支持传入目录，递归统计所有 `.py` 文件。
2. 增加 `--exclude` 参数跳过指定模式。
3. 给 `count_lines` 写单元测试，覆盖文件不存在与空文件。
4. 用 `re` 统计文件中函数定义的数量。

## 复习要点

- 参数解析、路径处理、日志、异常信息是 CLI 工具的四件套。
- 文件路径一律用 `pathlib`，避免手工拼接带来的平台差异。
- JSON 适合配置文件；复杂结构要考虑schema或配置校验。
- 主逻辑放进函数，`if __name__ == "__main__"` 只做入口。
