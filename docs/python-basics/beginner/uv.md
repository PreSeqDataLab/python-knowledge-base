# Python 基础 · 入门 · uv 工具链

> 结构参考 [菜鸟教程 Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)，正文为原创整理。

> 先读 [venv 与 pip](venv.md) 理解虚拟环境；本章只讲 uv 特有的工作流。

## 目标

- 理解 `uv` 在 Python 工具链中的定位。
- 能用 `uv` 创建虚拟环境、安装依赖、管理 Python 版本。
- 能区分 `uv pip` 与项目级 `uv add` 的使用场景。

## 知识点

### uv 是什么

`uv` 是 Astral 开发的 Python 包与环境管理工具，基于 Rust 实现。它把多项能力整合到一个命令中：

- Python 版本管理
- 虚拟环境创建
- 依赖安装与解析
- 锁文件与项目同步

它常被视为 `pip`、`virtualenv`、`pip-tools` 等工具的统一替代方案，并且安装速度通常明显快于传统 `pip`。

### 安装 uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

安装后验证：

```bash
uv --version
```

### 创建虚拟环境

```bash
uv venv
source .venv/bin/activate
```

默认会在当前目录创建 `.venv`。指定 Python 版本：

```bash
uv venv --python 3.12
```

### 安装与管理 Python 版本

```bash
uv python install 3.12
uv python list
```

这适合需要在同一台机器上管理多个 Python 版本的场景。

### 快速安装包：uv pip

```bash
uv pip install requests
uv pip install -r requirements.txt
uv pip freeze > requirements.txt
uv pip uninstall requests
```

`uv pip` 适合已有 `requirements.txt` 的轻量项目，强调“快速安装包”。

### 项目级依赖：uv add / uv run

```bash
uv init my-project
cd my-project
uv add requests
uv run python main.py
```

项目模式下：

- `pyproject.toml` 声明项目与依赖
- `uv.lock` 锁定精确版本
- `uv sync` 根据锁文件同步环境
- `uv run` 在项目环境中执行命令

### 两种模式怎么选

| 场景 | 推荐方式 |
| --- | --- |
| 临时脚本、已有 `requirements.txt` | `uv pip` |
| 新项目、需要锁文件与可复现依赖 | `uv add` + `uv.lock` |
| 需要多个 Python 版本 | `uv python install` |

## 示例：从零创建一个项目

```bash
uv init demo
cd demo
uv add httpx pytest
uv run python -c "import httpx; print(httpx.__version__)"
```

## 练习

1. 用 `uv venv --python 3.12` 创建一个虚拟环境。
2. 用 `uv pip install requests` 安装包并生成 `requirements.txt`。
3. 用 `uv init` 创建项目，比较 `requirements.txt` 与 `uv.lock` 的区别。

## 复习要点

- `uv` 统一管理 Python 版本、环境和依赖。
- `uv venv` 创建环境，`uv pip install` 快速装包。
- `uv add` 用于项目模式，会维护 `pyproject.toml` 和 `uv.lock`。
- `uv run` 在项目环境中执行命令。
- 新项目优先考虑项目模式，可复现性更好。
