# Python 基础 · 入门 · Jupyter Notebook

> 结构参考 [菜鸟教程 Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)，正文为原创整理。

## 目标

- 理解 Notebook、Cell 与 Kernel 的关系。
- 能在本机启动 Jupyter Notebook 或 JupyterLab。
- 能让 Notebook 使用指定的虚拟环境。

## 知识点

### Jupyter 是什么

Jupyter 是基于 Web 的交互式计算环境，常用于：

- 数据分析与可视化
- 教学演示
- 算法实验
- 可复现的研究报告

Notebook 文件本质是 JSON，由多个 Cell 组成。常见 Cell 类型：

- **Code Cell**：执行代码并展示输出
- **Markdown Cell**：写说明、公式和图片

它适合“边写边跑边记”的探索式开发，但不太适合直接替代工程化项目中的脚本和测试。

### 安装

使用 pip：

```bash
pip install notebook
```

使用 conda：

```bash
conda install notebook
```

使用 uv：

```bash
uv add jupyterlab
```

### 启动

经典 Notebook：

```bash
jupyter notebook
```

JupyterLab：

```bash
jupyter lab
```

启动后浏览器会打开本地地址，通常是 `http://localhost:8888`。

### Kernel 与虚拟环境

Notebook 执行的 Python 来自某个 Kernel，不一定是当前终端里的 Python。若想让 Notebook 使用虚拟环境，需要注册 Kernel：

```bash
source .venv/bin/activate
python -m pip install ipykernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"
```

之后在 Notebook 页面选择 `Python (myenv)`。

### 常用操作

- `Shift + Enter`：执行当前 Cell 并跳到下一个
- `Ctrl + Enter`：执行当前 Cell 但停留在原处
- `A`：在上方插入 Cell
- `B`：在下方插入 Cell
- `M`：把 Cell 改为 Markdown
- `Y`：把 Cell 改回 Code

## 示例：第一个 Notebook

在一个 Code Cell 中输入：

```python
import matplotlib.pyplot as plt

values = [1, 3, 2, 5]
plt.plot(values)
plt.show()
```

再插入一个 Markdown Cell，写明这组数据的来源和结论。这样代码、结果和解释可以放在同一份文档中。

## 练习

1. 创建一个 Notebook，混合使用 Markdown Cell 和 Code Cell。
2. 注册一个名为 `py311` 的 Kernel，并在 Notebook 中切换到它。
3. 用 Notebook 读取一个 CSV 文件并画出折线图。

## 复习要点

- Notebook 由 Cell 组成，文件本质是 JSON。
- Kernel 决定代码由哪个 Python 环境执行。
- Jupyter 适合探索和分析，工程化代码仍应放到 `.py` 文件中。
- `jupyter notebook` 与 `jupyter lab` 是两种前端入口。
- 使用虚拟环境时要注册对应的 Kernel。
