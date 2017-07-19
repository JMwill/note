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

## 分支

### 切换到分支BRANCH

```
git checkout <BRANCH>
```

### 把分支B1 合并到分支B2 中

```
git checkout <B2>
git merge <B1>
```

### 在当前的HEAD分支上创建一个分支

```
git branch <BRANCH>
```

### 在其的分支BASE上创建一个新分支NEW

```
git branch <NEW> <BASE>
```

### 删除分支

```
git branch -d <BRANCH>
```

## 更新

### 从远端origin中获取最新的变更记录

```
git fetch # 不会进行合并操作
```

### 从远端origin获取最新的变更

```
git pull # 获取变更之后会进行合并操作
```

### 应用别处获得的补丁

```
git am -3 patch.mbox # 如果发生冲突，解决之后运行下面的命令
git am --resolve
```

## 恢复

### 恢复到最后的提交状态

```
git checkout -f | git reset --hard   # 无法撤销硬重置
```

### 撤销最后的提交

```
git revert HEAD   # 会生成新的提交记录
```

### 撤销特定的提交

```
git revert <ID>   # 会生成新的提交记录
```

### 修改最后的提交

```
git commit -a --amend   # 在编辑了一个损坏的文件之后
```

### 签出文件的一个特定的版本ID

```
git checkout <ID> <FILE>
```

## 发布

### 提交本地所有修改

```
git commit -a
```

### 给他人准备一个补丁

```
git format-patch origin
```

### 把变更发布到远端origin

```
git push [REMOTE] [BRANCH]
```

### 标记一个版本或者里程碑

```
git tag <VERSION_NAME>
```

## 有用的技巧

### 获取帮助

```
git help [command]
```

### 创建空分支

```
git symbolic-ref HEAD refs/heads/newbranch
rm .git/index
git clean -fdx
<DO WORK>
git add your files
git commit -m 'Initial commit'
```

### 图形化日志

```
git log --graph
git log --graph --pretty=online --abbrev-commit
```

### 把分支提交到远端

```
git push <REMOTE> <BRANCH>
```

### 删除远端和本地分支

```
git push <REMOTE> :<BRANCH>
git branch -d <BRANCH>
```

## 解决合并时的冲突

### 查看合并冲突

```
git diff
```

### 与共同的祖先文件来比较合并时的冲突之处

```
git diff --base <FILE>
```

### 与别人修改的版本来比较合并时的冲突之处

```
git dirr --theirs <FILE>
```

### 与我们的修改版本来比较合并时的冲突之处

```
git diff --ours <FILE>
```

### 放弃冲突时的修改

```
git reset --hard
git rebase --skip

# 解决冲突后

git add <CONFLICTING FILE>
git rebase --continue
```

## 配置

```
git config [--global]

# 全局配置保存在 ~/.gitconfig

user----------|--user.name <NAME>
              |--user.email <EMAIL>

color---------|--color.ui auto

github--------|--github.user <USER>
              |--github.token <TOKEN>

optimisation--|--pack.threads 0
              |--diff.renamelimit 0 # 不要在小内存机子上用

windows-------|--core.autocrlf true
```
