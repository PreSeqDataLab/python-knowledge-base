# Python 基础 · 入门 · VS Code

## 知识点

### 安装与打开项目

1. 从 <https://code.visualstudio.com/> 下载安装。
2. 用 `File → Open Folder` 打开项目根目录（本仓库就是包含 `main.py` 和 `docs/` 的目录）。
3. 不要只打开单个文件；打开文件夹后，终端、解释器和 Git 才能按项目工作。

### 必装扩展

先装前四个即可，其余按需：

| 扩展 | 用途 | 建议 |
| --- | --- | --- |
| Python | 解释器、调试、测试 | 必装 |
| Pylance | 类型提示与跳转 | 随 Python 自动安装 |
| Ruff | lint 与格式化 | 必装，二选一即可 |
| Jupyter | `.ipynb` 交互式开发 | 数据探索必装 |
| Docker | 镜像、容器、compose | 做部署时装 |
| Remote - SSH | 连接 Linux 服务器 | 有远程环境时装 |
| WSL | 在 Windows 上使用 Linux | Windows 用户装 |
| GitLens | Git 历史与行级 blame | 推荐 |
| REST Client / Thunder Client | 在编辑器里发 HTTP 请求 | 调 API 推荐 |

不要一次装几十个扩展；同类只留一个，例如 Ruff 和 Black 不要同时启用。

### 选择解释器

1. `Ctrl+Shift+P`（macOS 为 `Cmd+Shift+P`）打开命令面板。
2. 执行 `Python: Select Interpreter`。
3. 选择项目里的 `.venv/bin/python`。

选错解释器是新手最常见的问题：终端里 `python` 能用，编辑器却提示找不到模块，通常就是这里没选对。底部状态栏会显示当前解释器路径。

### 集成终端

`Ctrl+\` 打开终端。VS Code 默认会在项目根目录启动终端；激活虚拟环境后，`python`、`pip`、`uvicorn` 都指向项目环境。创建与激活的完整说明见 [venv 与 pip](venv.md)。

```bash
source .venv/bin/activate
python -V
```

如果终端没有自动激活，执行 `Python: Select Interpreter` 后关掉终端重新打开。退出虚拟环境用 `deactivate`；`exit` 是关闭终端。

### 运行与调试

- 右上角 ▶ 运行当前文件，适合小脚本。
- `F5` 启动调试，可打断点、看变量、单步执行。
- 调试配置放在 `.vscode/launch.json`，本仓库已经有一份 FastAPI 配置：

```json
{
  "name": "Python Debugger: FastAPI",
  "type": "debugpy",
  "request": "launch",
  "module": "uvicorn",
  "args": ["main:app", "--reload", "--port", "8001"]
}
```

`type: debugpy` 是 VS Code 的 Python 调试器；`module: uvicorn` 表示用 `python -m uvicorn` 启动；`args` 与命令行参数一一对应。

### 工作区设置

项目级设置放在 `.vscode/settings.json`，可以提交到 Git，让团队行为一致：

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python",
  "python.terminal.activateEnvironment": true,
  "editor.formatOnSave": true,
  "editor.rulers": [88],
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.codeActionsOnSave": { "source.organizeImports": "explicit" }
  }
}
```

个人主题、字体、快捷键放在用户设置里，不要混进项目设置。

### 远程开发

- **Remote - SSH**：连接 Linux 服务器，在远端打开项目；Python 解释器和扩展都装在远端。
- **WSL**：Windows 用户连接 WSL2，把项目放在 Linux 文件系统里，避免跨文件系统性能问题。
- **Dev Containers**：用 `.devcontainer/devcontainer.json` 定义开发容器，和 Docker 部署环境保持一致。

远程开发时，先确认“左下角显示的是哪个环境”，再选解释器；否则会在本机装依赖、在远端运行，或者反过来。

### 常用快捷键

常用：`Ctrl+Shift+P` 命令面板、`Ctrl+P` 快速打开、`Ctrl+\`` 终端、`F5` 调试、`Shift+Alt+F` 格式化。macOS 把 `Ctrl` 换成 `Cmd`。

## 示例：调试本仓库的 FastAPI 服务

1. 打开项目根目录，选择 `.venv/bin/python`。
2. 在 `main.py` 的 `root()` 函数里点行号左侧打一个断点。
3. 按 `F5`，选择 `Python Debugger: FastAPI`。
4. 浏览器访问 `http://127.0.0.1:8001/`，调试器会停在断点。
5. 用调试工具栏查看变量、单步执行，然后继续运行。

如果启动失败，先看终端里的报错：解释器、工作目录、端口占用是最常见的三类原因。

## 常见排障

| 现象 | 常见原因 | 处理 |
| --- | --- | --- |
| 找不到模块，但终端能运行 | 编辑器解释器选错 | `Python: Select Interpreter` 选 `.venv` |
| 终端里的 `python` 不是项目环境 | 虚拟环境未激活 | 重开终端或手动 `source .venv/bin/activate` |
| Pylance 报导入错误 | 工作区根目录或解释器不对 | 打开项目根目录，重新选解释器 |
| 远程连接后扩展不生效 | 扩展装在本机而非远端 | 在远程窗口里重新安装扩展 |
| 保存时格式化冲突 | 同时启用了 Black 和 Ruff | 只保留一个格式化器 |

## 练习

1. 选择项目 `.venv` 解释器，运行 `hello.py`。
2. 创建 `.vscode/settings.json`，开启保存时格式化和 88 列标尺。
3. 用 `launch.json` 调试 FastAPI，在 `root()` 打断点并查看变量。
4. 用 Remote - SSH 连接一台 Linux 服务器，在远端安装 Python 扩展并运行脚本。
5. 创建 `.vscode/extensions.json`，把团队必装扩展写进推荐列表。

## 复习要点

- 先选解释器，再运行；底部状态栏是判断当前环境的入口。
- 项目设置提交到 Git，个人设置留在用户配置。
- 调试 FastAPI 用 `debugpy + uvicorn`，断点比 `print` 更适合排查请求流程。
- 远程开发时，扩展、解释器和依赖都要在远端。

## 扩展阅读

- 相关章节：[环境与解释器](environment.md)、[uv 工具链](uv.md)
- 外部文档：[VS Code Python](https://code.visualstudio.com/docs/python/python-tutorial)、[Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)
