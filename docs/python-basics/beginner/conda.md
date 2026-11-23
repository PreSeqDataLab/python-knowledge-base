# Python 基础 · 入门 · Anaconda / Miniconda

> 先读 [venv 与 pip](venv.md) 理解虚拟环境的基本概念；本章只讲 conda 特有的环境与包管理。

## 目标

- 分清 Anaconda 与 Miniconda 的定位。
- 能安装 Miniconda 并初始化 shell。
- 能创建、激活、克隆和删除 conda 环境。
- 能用 `environment.yml` 导出和恢复环境。
- 知道生物信息常用的 `bioconda` 渠道和商业使用注意事项。

## 前置

- [环境与解释器](environment.md)
- [venv 与 pip](venv.md)

## 知识点

### Anaconda 与 Miniconda

| 方案 | 包含内容 | 适用场景 |
| --- | --- | --- |
| Anaconda | Python + conda + 大量数据科学包 | 希望开箱即用，做数据分析或机器学习 |
| Miniconda | Python + conda | 希望轻量安装，按需添加包 |

两者都使用 `conda` 管理环境和包，区别主要在预装包数量和安装体积。Miniconda 更轻，通常更推荐作为起点。

> Anaconda Distribution 和 `defaults` 渠道受 Anaconda 服务条款约束；商业或机构环境先确认许可政策。Miniconda 配合 `conda-forge` / `bioconda` 是常见选择。

### 安装 Miniconda

```bash
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh -b -p "$HOME/miniconda3"
source "$HOME/miniconda3/bin/activate"
conda init bash
```

- `-b` 静默安装，`-p` 指定安装路径；单用户安装不要加 `sudo`。
- ARM64 机器把文件名换成 `Miniconda3-latest-Linux-aarch64.sh`。
- `conda init bash` 会修改 `~/.bashrc`（zsh 用 `conda init zsh`）；重新打开终端或 `source ~/.bashrc` 后 `conda activate` 才可用。
- 安装 Anaconda 的方式类似，下载地址和版本号以 [官方归档页](https://repo.anaconda.com/archive/) 为准。

### 环境管理

```bash
conda create -n myenv python=3.11 -y
conda activate myenv
conda deactivate

conda env list
conda create -n myclone --clone myenv
conda env remove -n myenv -y
```

- `conda activate` 提示未初始化时，执行 `conda init bash` 并重开终端。
- `conda env list`（或 `conda info --envs`）中带 `*` 的是当前环境。
- 删除环境用 `conda env remove -n myenv`，也可以 `conda remove -n myenv --all`。
- 环境名不要和项目名混在一起；建议一个项目一个环境。

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

安装慢时可以用 `mamba` 或 `micromamba`；它们兼容 conda 的包和命令，求解更快。

### 生物信息常用源

生物信息工具大量发布在 `bioconda`，它依赖 `conda-forge`。建议在命令里显式指定渠道：

```bash
conda create -n bioinfo -c conda-forge -c bioconda \
  samtools bwa fastqc -y
```

- 渠道顺序就是优先级，`-c conda-forge` 放在 `-c bioconda` 前面。
- 不建议随意混用 `defaults`、`conda-forge`、`bioconda`；优先用 `conda-forge` + `bioconda`。
- 需要固定全局顺序时再配置 `channel_priority strict`，新手先用显式 `-c` 更直观。

### 导出与恢复

```bash
conda env export --from-history > environment.yml
conda env create -f environment.yml
```

- `--from-history` 只记录你显式安装的包，跨平台恢复时更稳。
- `--no-builds` 保留版本但去掉构建字符串，仍然可能受平台限制。
- `conda list --explicit > spec-file.txt` 可锁定精确构建，但通常不能跨平台使用。

### 卸载

```bash
conda init --reverse --all
rm -rf "$HOME/miniconda3"   # 换成实际安装路径
```

安装到 `/opt` 等系统目录时需要用 `sudo` 删除；执行 `rm -rf` 前先确认路径。

## 示例：创建生物信息环境

```bash
conda create -n bioinfo -c conda-forge -c bioconda samtools bwa fastqc -y
conda activate bioinfo
samtools --version | head -1
```

如果求解很慢，先确认渠道顺序正确，或改用 `mamba create ...`。

## 练习

1. 创建名为 `py311` 的环境，并指定 Python 3.11。
2. 在环境中安装 `requests`，用 `conda list` 确认。
3. 用 `--from-history` 导出 `environment.yml`，删除环境后恢复。
4. 创建一个 `bioinfo` 环境，从 bioconda 安装 `samtools` 并查看版本。
5. 故意在未初始化的 shell 里执行 `conda activate`，读懂报错并修复。

## 复习要点

- Anaconda 预装多，Miniconda 更轻；入门优先 Miniconda。
- `conda create` 创建环境，`conda activate` 激活，`conda deactivate` 退出。
- `conda init` 负责 shell 集成；新终端才能直接使用 `conda activate`。
- 生物信息工具优先用 `conda-forge` + `bioconda`，注意渠道顺序。
- 导出环境优先用 `conda env export --from-history`。

## 扩展阅读

- 相关章节：[venv 与 pip](venv.md)、[uv 工具链](uv.md)
- 外部文档：[conda](https://docs.conda.io/)、[Miniconda](https://docs.anaconda.com/miniconda/)、[Bioconda](https://bioconda.github.io/)
