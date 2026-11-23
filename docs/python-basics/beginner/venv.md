# Python 基础 · 入门 · venv 与 pip

> 每个项目一个独立环境：依赖装进项目，不污染系统 Python。

## 目标

- 理解为什么需要虚拟环境。
- 用 `venv` 创建、激活和退出项目环境。
- 用 `pip` 安装依赖并导出 `requirements.txt`。
- 能用 VS Code 的 `Python: Create Environment` 创建环境并安装依赖。
- 知道 `venv`、`conda`、`uv` 各自适合什么场景。

## 前置

- [环境与解释器](environment.md)

## 知识点

### 为什么需要虚拟环境

不同项目可能依赖同一个库的不同版本。如果全部装进系统 Python，很容易互相冲突，也可能因为权限问题只能 `sudo pip install`，把系统环境弄乱。虚拟环境把每个项目的解释器和依赖隔离开，删除 `.venv/` 就等于清空该项目的依赖。

### 创建环境

在项目根目录执行：

```bash
python3 -m venv .venv
```

- `python3` 是用于创建环境的解释器；`.venv/` 是环境目录，通常放在项目根目录。
- 目录名可以是 `.venv`、`venv` 或 `env`，团队统一即可；本仓库使用 `.venv`。
- 创建后不要手动修改 `.venv/` 里的文件，也不要提交到 Git。

Ubuntu/Debian 如果提示 `No module named venv`，先安装：

```bash
sudo apt install python3-venv -y
```

### 激活与退出

Linux / macOS：

```bash
source .venv/bin/activate
deactivate
```

Windows PowerShell 用 `.venv\Scripts\Activate.ps1` 激活；cmd 用 `.venv\Scripts\activate.bat`；退出同样是 `deactivate`。

激活后终端提示符前通常会出现 `(.venv)`。激活只在当前终端生效；新开终端需要重新激活。退出用 `deactivate`，不是 `exit`（`exit` 会关闭终端）。

### 安装与管理依赖

激活环境后：

```bash
python -m pip install fastapi uvicorn
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```

- 用 `python -m pip` 而不是直接 `pip`，可以确保 pip 属于当前解释器。
- `pip freeze` 会导出当前环境的全部依赖及版本，适合锁定可复现的环境。
- `pip list` 查看已安装包，`pip show fastapi` 查看单个包的详情。
- 升级 pip：`python -m pip install --upgrade pip`。

### 项目里的约定

- `.venv/` 写入 `.gitignore`，不要提交。
- `requirements.txt` 提交到 Git，方便别人重建环境。
- 不要把 `.venv/` 复制到另一台机器；用 `requirements.txt` 重新安装。
- 一个项目只选一种环境工具，不要在同一项目里混用 venv、conda 和 uv。

### 用 VS Code 创建环境

1. 打开项目：`File → Open Folder...`，或在项目目录执行 `code .`（若命令不可用，先在命令面板执行 `Shell Command: Install 'code' command in PATH`）。首次打开时选择信任工作区，扩展和调试才能正常工作。
2. 新建 `requirements.txt`，写入依赖：

   ```text
   fastapi
   redis
   types-redis
   uvicorn
   ```

3. 打开命令面板（Windows/Linux `Ctrl+Shift+P`，macOS `Cmd+Shift+P`），执行 `Python: Create Environment`。
4. 选择 `Venv`，再选择本机 Python 版本。
5. 选择 `requirements.txt`，VS Code 会创建 `.venv/` 并自动安装依赖。
6. 如果状态栏没有显示 `.venv`，执行 `Python: Select Interpreter` 选中它。

用 `python -m pip list` 确认依赖已装进 `.venv`。如果项目里已有 `.venv`，VS Code 也可以直接选择它，不必重复创建。

### venv、conda、uv 怎么选

| 工具 | 适合场景 | 优点 | 注意 |
| --- | --- | --- | --- |
| `venv` + `pip` | 通用 Python 项目 | 标准库自带，零额外依赖 | 只隔离 Python 包 |
| `conda` | 数据科学、需要非 Python 依赖 | 能管理 C 库、R 等 | 体积大、解析慢 |
| `uv` | 新项目、追求速度 | 安装快、有锁文件、项目模式 | 团队需要统一采用 |

建议先掌握 `venv` + `pip`，它是理解隔离概念的基线；需要 conda 生态或更快的依赖管理时再切换。

## 示例：从零创建一个项目

```bash
mkdir demo && cd demo
python3 -m venv .venv && source .venv/bin/activate
python -m pip install fastapi uvicorn
python -m pip freeze > requirements.txt
```

项目结构：`.venv/`（不提交）、`requirements.txt`（提交）、`main.py`。VS Code 的 `Python: Create Environment` 会完成同样的步骤。

## 常见误区

- 直接 `pip install`：可能装进系统 Python；用 `python -m pip` 并确认 `which python`。
- 新开终端忘记激活：依赖看似“消失”，其实是换回了系统解释器。
- 用 `sudo pip install`：会污染系统环境，应该用虚拟环境。
- 把 `.venv/` 提交到 Git：仓库会变得很大，且环境不可跨机器复用。
- 在同一个项目里混用 conda、uv、venv：依赖来源混乱，很难排障。
- 在错误的环境里执行 `pip freeze`：导出的 `requirements.txt` 包含无关依赖。

## 练习

1. 创建 `.venv`，安装 `requests`，用 `pip freeze` 导出依赖。
2. 删除 `.venv`，仅凭 `requirements.txt` 重建环境并验证导入。
3. 开两个终端，一个激活、一个不激活，分别执行 `which python` 观察差异。
4. 在 `.gitignore` 加入 `.venv/`，确认 `git status` 不再显示该目录。
5. 用 `python -m pip list` 和 `pip list` 对比，确认两者指向同一解释器。

## 复习要点

- 一个项目一个虚拟环境，`.venv/` 不提交，`requirements.txt` 提交。
- 激活只在当前终端生效；退出用 `deactivate`。
- 用 `python -m pip` 避免用错 pip。
- `venv` 是基线，`conda` 和 `uv` 是不同场景下的替代方案。

## 扩展阅读

- 相关章节：[环境与解释器](environment.md)、[VS Code](vscode.md)、[Anaconda / Miniconda](conda.md)、[uv 工具链](uv.md)
- 外部文档：[venv](https://docs.python.org/zh-cn/3/library/venv.html)、[pip](https://pip.pypa.io/en/stable/)
