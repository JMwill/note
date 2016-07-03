# Git常用命令

## 创建仓库 Create

### 从已有文件

```
cd ~/project/path
git init
git add .
```

### 从已有仓库

```
git clone ~/existing/repo ~/new/repo
git clone you@host.org:dir/project.git (默认协议为ssh)
```

### 为已有的本地数据文件创建远程仓库

```
mkdir repo.git && cd repo.git
git init --bare [--shared=group]
```

