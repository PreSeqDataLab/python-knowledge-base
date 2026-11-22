# Python 基础 · 入门 · 环境与解释器

> 结构参考 [菜鸟教程 Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)，正文为原创整理。

## 目标

- 能在 Linux 上安装并验证 Python 3。
- 理解 PATH、解释器和脚本运行方式。
- 知道 Anaconda、uv、Jupyter 各自的定位与入口。

## 知识点

### Python 3 与跨平台

Python 3 可运行在 Linux、Windows、macOS 以及多种类 Unix 和嵌入式环境中。官方资源：

- 官网：<https://www.python.org/>
- 中文文档：<https://docs.python.org/zh-cn/3/>
- 源码下载：<https://www.python.org/downloads/source/>

安装方式通常二选一：

- 二进制包：最便捷，推荐日常使用。
- 源码编译：更灵活，可自定义编译选项。

### Linux 安装

多数 Linux 发行版已自带 Python 3，若未安装或需要升级，可用包管理器。

Ubuntu / Debian：

```bash
sudo apt update
sudo apt install python3 python3-pip -y
```

CentOS 7：

```bash
sudo yum install epel-release -y
sudo yum install python3 python3-pip -y
```

CentOS 8 / RHEL 8：

```bash
sudo dnf install python3 python3-pip -y
```

源码编译示例：

```bash
tar -zxvf Python-3.x.x.tgz
cd Python-3.x.x
./configure
make && make install
```

### 验证安装

```bash
python3 --version
pip3 --version
```

两条命令都能正常输出，说明 Python 3 与 pip 基本可用。

### PATH 与环境变量

如果 `python3` 已能执行，通常无需额外配置。若 Python 安装在非默认目录，需要把它加入 PATH：

```bash
export PATH="$PATH:/usr/local/bin/python"
```

常见环境变量：

| 变量 | 作用 |
| --- | --- |
| `PATH` | 查找可执行文件的路径 |
| `PYTHONPATH` | 查找自定义模块的额外路径 |
| `PYTHONHOME` | Python 安装根目录 |
| `PYTHONDONTWRITEBYTECODE` | 禁止生成 `.pyc` 缓存 |

### 运行 Python 的三种方式

1. 交互式解释器：终端输入 `python3`，逐行执行。
2. 脚本文件：`python3 script.py`。
3. 集成开发环境：如 VS Code、PyCharm。

### 常用命令行参数

| 参数 | 作用 |
| --- | --- |
| `-V` / `--version` | 查看版本 |
| `-c cmd` | 直接执行一段代码 |
| `-m module` | 以模块方式运行 |
| `-i` | 执行脚本后进入交互模式 |
| `-u` | 禁用输出缓冲 |
| `-h` | 查看帮助 |

## 工具入口

环境管理工具与交互工具已拆成独立章节：

- [Anaconda / Miniconda](conda.md)：数据科学发行版与 conda 环境管理
- [uv 工具链](uv.md)：Python 版本、虚拟环境与依赖的统一管理
- [Jupyter Notebook](jupyter.md)：交互式计算与探索式开发

## 示例：确认当前环境

```bash
python3 --version
python3 -c "import sys; print(sys.executable)"
```

第二条命令输出当前解释器的绝对路径，可用来确认终端与 IDE 使用的是否是同一个 Python。

## 练习

1. 查看当前系统 Python 3 版本。
2. 用 `python3 -c` 打印解释器路径。
3. 创建一个 `hello.py`，用 `python3 hello.py` 运行。

## 复习要点

- `python3 --version` 验证版本，`pip3 --version` 验证 pip。
- PATH 决定终端能找到哪个 `python3`。
- `python3 -m module` 是常用的模块运行方式。
- 环境管理工具和 Jupyter 已独立成章，便于按主题检索。
