# How to use git and github

## 关系图描述

```
      `log` -- is operates on --┐
                                ▼
`diff` -- is operates on --▶ `commit` -- is part of --▶ `repostory` -- is part of --▶ `Git` -- is type of --▶ `Version control`
                                                             ▲
                                 `clone` -- is operates on --┘
```

## Git

### log

git中的log可以通过添加参数来使得输出更加容易查看并理解`git log --graph --oneline branch1 branch2`可以用户查看多个分支之间的关系, 而使用`-n`参数可以让`log`输出固定的记录数

### commit

Git中commit是其组成部分, 每一次提交commit都可以使用`git log`来查看提交的记录的具体信息, 包括提交者, 时间, 提交备注等.

其中`git diff`工具针对Git中的一个个的commit, 以commit为基础来进行对比. 其作用相当于Unix操作系统中的`diff`以及Windows下的`fc`, 但是对比的是commit之间的差异.

### diff

`git diff`可以对当前目录下更改文件与暂存区内的文件差异进行对比, 而使用`git diff --staged`则可以对比暂存区与最新提交的commit之间的差异. 当需要撤销所有暂存区以及当前已跟踪且未存入暂存区的的文件中修改时可以使用: `git reset --hard`但是这个是一个高危操作, 会将所有的修改撤销掉, 并无法恢复.

### show

有时候由于对分支进行合并, 其中的一些更改会导致使用`diff`时显示两个不同分支之间`commit`的不同, 这样会使得想要查看同一分支上的修改变得困难, 这个时候就可以使用`show`来将提交与所在分支进行对比.

### 头指针分离问题

头指针分离问题实质上是因为检出到以前的commit上, 因为不知道用户会在上面干什么, 所以git会自动创建一个新的分支用于保存在上面的修改, 避免影响到检出的分支, 所以, 如果只是查看一些修改什么的, 直接检出回原分支即可.

#### 提交频率

过于频繁或者稀少的提交都是不好的, 对应与代码编辑, 为**每项逻辑更改进行一次提交**是很好的经验法则. 也就是如修改了某个函数的逻辑, 或者错误, 同时又修改了另一个函数的逻辑, 那么这两个修改应该独立开来进行提交commit, 并写上对应的更改信息, 因为两者的修改在逻辑上是独立的. 需要记住的一个原则是: 每个提交都应该具有一个清晰的逻辑目的, 而绝不应在不进行提交的情况下完成过多工作.

#### 多文件统计数据

通过`git log --stat`查看记录, 可以看到该次提交所影响到的或所更改的文件的统计数据.

### 检出旧版本代码

使用`git checkout`可以将代码还原到某个commit的状态, 但是如果仅仅是回退到某个commit状态, git会发出头指针分离的警告, 这是为了告诉你, 如果在回退后的版本内进行改动, 提交等一些操作会使得代码的版本混乱, 但是如果仅仅是查看之前版本的一些问题. 则无需理会这种警告. 同时, 如果要对版本库的内容进行改动, 使用`git checkout -b new_branch_name`来新建一个分支.

### 使用Git

对于Git而言, 许多的配置项都可以使用`git config`来进行设置, 比如想要让输出具备颜色则可以: `git config --global color.ui auto`. 其中`--global`表示设置会影响所有的Git项目.

### 配置Git工作空间

对Git进行全局设置:

```bash
git config --global core.editor "'/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl' -n -w"
git config --global push.default upstream
git config --global merge.conflictstyle diff3

# 第一行表示设置sublime text作为默认编辑器, 也可以设置其他的编辑器, 修改对应路径就好
# -n 表示新开一个窗口, -w表示等待文件关闭
```

### 提交commit信息样式指南

具体布局如下:

```
类型: 主题

消息正文

注释
```

#### 类型

类型有几种可能:

- feat: 新功能
- fix: 错误修复
- docs：文档修改
- style：格式、分号缺失等，代码无变动
- refactor：生产代码重构
- test：测试添加、测试重构等，生产代码无变动
- chore：构建任务更新、程序包管理器配置等，生产代码无变动。

#### 标题

主题不可以超过50个字符, 首字母大写, 末尾不加句号.

以祈使语气描述提交的任务, 而不是其已完成的任务. 例如, 使用 change... 而不是 changed 或 changes.

#### 消息正文

并不是所有的提交信息都复杂到需要主体, 因此这是可选内容, 仅在提交信息需要一定的解释和语境时使用, 消息体是用于解释提交任务的内容和原因, 而不是方法.

在编写正文时，需要在标题和正文间加一个空行，且每行的内容应控制在72个字符内。

#### 注释

注释是可选内容, 用于引用问题跟踪的 ID.

#### 提交信息示例

```
feat: 总结变动的内容，保持在50个字符内

如有需要，使用更详细的说明性文字，将其大概控制在72个字符。在部分语境中，第一行被
视为提交信息的主题，余下的文本被视为主体。分隔总结与主体的空行十分重要（除非你完
全忽略主体）；否则`log`、`shortlog`和`rebase`等多个工具容易发生混淆。

解释该提交信息所解决的问题，说明你进行该变动的原因，而不是方法（代码本身可以解释
方法）。该变动是否存在副作用或其他直觉性后果？在这里进行解释。

后续段落前需加空行。

- 可以列出要点

- 通常情况下，要点会使用空格加上连字符或星号，中间用空行分隔，但该规定存在差别。

如果你使用问题追踪，将其引用放在末尾，例如：

解决了问题：#123
另见：#456, #789
```

### remote

使用`remote`命令, 可以添加代码库的远程提交路径, 来方便进行代码的远程提交. 添加的命令为: `git remote add <remote-name> <remote-repo-path>`, 如: `git add remote origin git@github.com:cbuckey-uda/reflections.git`.

添加完成远程路径后, 通过`git push <remote-name> <branch-name>`来进行代码的提交, 如: `git push origin master`. 将远程路径中的代码改动同步到本地用的方式与`push`几乎一样, 只是需要将`push`换成是`pull`.

### fetch

在多人合作的开发中, 会出现多人同时修改同一份文件的问题. 为了能够在本地看到远程与本地的不同, 可以先使用`fetch`来更新远程版本库的本地版本, 然后将远程版本库的本地更新版与本地最新的需要合并的版本进行对比.

`git fetch origin`会更新origin远程代码库的所有分支的本地副本.

### Windows下路径长度限制

由于Windows下会有路径最大长度的问题, 这问题可以通过运行git bash来设置: `git config --system core.longpaths true`.