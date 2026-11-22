# Python 基础 · 入门 · Anaconda / Miniconda

> 结构参考 [菜鸟教程 Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)，正文为原创整理。

## 目标

- 理解 Anaconda 与 Miniconda 的区别。
- 能用 `conda` 创建、激活、克隆和删除 Python 环境。
- 能用 `conda` 安装、更新、卸载包，并导出环境配置。

## 知识点

### Anaconda 与 Miniconda

| 方案 | 包含内容 | 适用场景 |
| --- | --- | --- |
| Anaconda | Python + conda + 大量数据科学包 | 希望开箱即用，做数据分析或机器学习 |
| Miniconda | Python + conda | 希望轻量安装，按需添加包 |

两者都使用 `conda` 管理环境和包。区别主要在预装包数量和安装体积。

### Linux 安装

交互式安装：

```bash
curl -O https://repo.anaconda.com/archive/Anaconda3-2025.11-Linux-x86_64.sh
chmod +x Anaconda3-2025.11-Linux-x86_64.sh
bash Anaconda3-2025.11-Linux-x86_64.sh
```

静默安装到指定目录：

```bash
# -b 静默安装（无交互），-p 指定安装路径
sudo bash Anaconda3-2025.11-Linux-x86_64.sh -b -p /opt/anaconda3
```

静默安装不会自动完成 shell 初始化，需要按需执行：

```bash
source /opt/anaconda3/bin/activate
conda init --all
```

如果安装到 `$HOME/anaconda3`，通常不需要 `sudo`，更适合单用户使用。目标目录必须不存在，否则安装器会报错退出。

### 环境管理

```bash
# 创建环境
conda create --name myenv
conda create --name myenv python=3.11

# 激活 / 退出
conda activate myenv
conda deactivate

# 查看环境
conda env list
conda info --envs

# 克隆环境
conda create --name myclone --clone myenv

# 删除环境
conda env remove --name myenv
conda remove --name myenv --all
```

### 包管理

| 命令 | 功能 |
| --- | --- |
| `conda install package_name` | 安装指定包 |
| `conda install package_name=1.2.3` | 安装指定版本 |
| `conda update package_name` | 更新包 |
| `conda remove package_name` | 卸载包 |
| `conda list` | 查看当前环境的包 |
| `conda search package_name` | 搜索仓库中的包 |
| `conda clean --all -y` | 清理缓存与不再需要的包 |

### 导出与恢复

```bash
conda env export > environment.yml
conda env create -f environment.yml
```

恢复时若想去掉平台相关前缀，可使用：

```bash
conda env export --no-builds > environment.yml
```

### 卸载

```bash
conda init --reverse --all
sudo rm -rf /opt/anaconda3
```

删除目录前要确认路径正确；`rm -rf` 不可撤销。

## 示例：创建数据分析环境

```bash
conda create -n data python=3.11 numpy pandas matplotlib
conda activate data
python -c "import pandas as pd; print(pd.__version__)"
```

## 练习

1. 创建名为 `py311` 的环境，并指定 Python 3.11。
2. 在环境中安装 `requests`，再用 `conda list` 确认。
3. 导出环境到 `environment.yml`，删除环境后尝试恢复。

## 复习要点

- Anaconda 预装包多，Miniconda 更轻量。
- `conda create` 创建环境，`conda activate` 激活环境。
- `conda env list` 查看环境，当前环境会标记 `*`。
- 导出/恢复环境用 `environment.yml`。
- 静默安装要理解 `-b` 和 `-p` 的含义。
