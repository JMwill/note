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

## 浏览

### 工作日常目录中所有发生变化的文件

```
git status
```

### 已经纳入版本管理的文件所发生的变化

```
git diff
```

### 在ID1 和ID2 之间发生的变化

```
git diff <ID1> <ID2>
```

### 变更的历史

```
git log
```

### 查看带文件修改记录的变更历史

```
git whatchanged
```

### 谁在什么时间修改了文件中的什么内容

```
git blame <FILE>
```

### 查看特定变更ID的更新细节

```
git show <ID>
```

### 查看特定变更ID中的特定文件的变更细节

```
git diff <ID>:<FILE>
```

### 查看所有本地分支

```
git branch
```

### 按模式搜索

```
git grep <PATHTERN> [PATH]
```