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

### Tasklist 语法

在 issue 中使用 tasklist 语法能够直接对显示的复选列表进行直接勾选或者取消, 方便管理. 对应语法是:

```md
# 任务
- [ ] 任务一
- [x] 任务二
- [ ] 任务三
```

同时还可以通过提交信息来操作 issue. 在每个 issue 标题下面都分配了一个编号如: `#10`, 在提交信息中加入这个编号就能够在 issue 中显示相关信息, 还可以在提交中以: `fix #10`, `fixes #10`, `fixed #10`, `close #10`, `closes #10`, `closed #10`, `resolve #10`, `resolves #10`, `resolved #10` 等语法标记 issue 的状态. 无需手动找寻.

### pull request

在收到 pull request 之后, 如果想要获取对应的 diff 文件或者 patch 文件, 可以在对应的 URL 后面添加 `.diff` 或者 `.patch`

### Conversation

在 Github 中, 如果想要在评论框里面引用别人的话, 可以鼠标选中后按 R 键就能够直接将话语填充到发表评论框中

### Files Changed

在 pull request 中的 Files changed 页通过在 URL 末尾添加 `?w=1` 可以不显示空格的差别. 减少阅读障碍.

## 使用 Pull Request

pull request 应该尽早发起, 即使功能尚未完成, 后续向发送过 Pull Request 的分支添加提交时, 该提交依然会自动添加至已发送的 Pull Request 中. 为了避免误操作合并未完成的 Pull Request, 可以在 Pull Request 的标题中添加前缀 `[WIP]`, 表示 `Work In Progress`.

### Fork 或 Clone 后的仓库维护

为了跟非自己的原仓库代码进行同步, 需要设置原仓库为对应的源: `git remote add upstream git://github.com/upstream/whatever.git`, 然后通过:

```bash
git fetch upstream
git merge upstream/master
```

来同步最新代码, 让当前分支代码维持在最新状态

## 采纳 Pull Request

在收到 Pull Request 请求并希望合并到仓库时可以将请求者的仓库作为 "请求源" 来设置源信息:

`git remote add PRWho git@github.com:PRWho/whatever.git` 并 `git fetch PRWho`

然后创建一个分支来测试合并情况:

`git checkout -b pr1` 并 `git merge PRWho/need-merge-branch`

在检查无误后就可以删除分支: `git branch -D pr1`

最后再在 Github 站点上点击 `Merge pull request` 按钮. 或者可以通过 CLI 操作进行合并:

```bash
git checkout your-need-merge-branch
git merge PRWho/need-merge-branch

# 检查下本地与远端的区别
git diff origin/your-need-merge-branch

# 提交到远程
git push
```

提交后 Github 上的 Pull Request 就会自动变为完成状态.
