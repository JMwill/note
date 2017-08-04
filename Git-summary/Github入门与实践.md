# 《Github 入门与实践》记录

## 非章节记录

对 Git 进行全局设置:

```bash
git config --global user.name "Your User Name"
git config --global user.email "your_email@example.com"

# 可以通过直接编辑 ~/.gitconfig 文件来进行设置

# 一般 Git 安装时就应该已经设置的了, 能够提高输出的可读性
git config --global color.ui auto
```

### git log

想要只显示提交信息的第一行: `git log --pretty=short`

只显示指定目录, 文件的日志: `git log file_or_folder`

查看文件改动使用 `-p` 参数: `git log -p` 或者 `git log -p file_or_folder`

使用 `--graph` 参数能更直观地查看日志信息: `git log --graph`

### git merge

使用 merge 时, 如果想要进行合并, 同时保证输入合并信息可以添加 `--no-ff` 参数: `git merge --no-ff your-branch`

### git reset

让仓库回溯到某个状态可以使用: `git rest --hard [hash code]`

### git reflog

在回溯到某个状态时, 如果需要返回回去, 可以使用 `reflog` 来查看历史日志, 里面包含所有的 git 命令操作记录. 在不进行 GC 的情况下都可以看到近期的历史状态.

### git rebase -i 压缩历史

通过使用 `git rebase -i HEAD~5` 的方式来对多个 commit 来进行改写, 合并等.

### git remote add

使用 `git remote add [identifier name] [remote git repo]` 可以为本地仓库添加远程地址, 并命名为你想要的 `[identifier name]`.

### git push

在进行 `git push` 时添加额外的参数 `-u` 能将推送的目标设定为本地仓库当前分支的 `upstream`. 之后的 `git pull` 都会直接从设定的上游获取.

## Github 功能

### 选定代码

在 Github 上的文件, 点击行号能够选定对应的代码, 使用 `Shift+鼠标点击` 能够选定代码段. 这个功能可以直接通过在文件的 URL 上添加 `#L10-L20`的方式来实现选定. 只选定一行的话则将 `-` 以及后面的去掉即可.

### 查看分支之间的差别

直接在对应的仓库 URL 后添加 `/compare/branch-one...branch-two` 就可以查看两个分支间的差别.

想要以时间段来查看差别的话可以在仓库 URL 后添加 `/compare/branch-name@{7.day.ago}...branch-name` 的方式来查看7天内的差别. 还可以用 `week`, `month`, `year` 来规定区间.

查看指定日期与现在的区别可以使用 `/compare/branch-name@{2013-01-01}...branch-name` 的方式来实现
