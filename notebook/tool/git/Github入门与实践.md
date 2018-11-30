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

## 与Github 相互协作的工具与服务

### hub 命令

hub 是一个封装了 git 命令的命令行工具. Mac 下可以通过: `brew install hub` 来安装, 其他环境可以参照[官网][1], 或者通过编译的方式安装:

```bash
curl https://hub.github.com/standalone -sLo ~/bin/hub
chmod +x ~/bin/hub


# 添加到 .bash_profile 中, 有些系统是 .bashrc 文件
echo 'export PATH="~/bin:$PATH"' >> ~/.bash_profile

# 重新加载
source ~/.bash_profile

# 确认安装成功
hub --version

# 将 hub 设置为 git 来使用
echo 'eval "$(hub alias -s)"' >> ~/.bash_profile
```

如果是通过安装包的方式安装的话可能会包含有 shell 补全, 如果是其他方式而导致没有 shell 补全可以通过添加对应脚本解决, 地址是:

```
bash: https://github.com/defunkt/hub/blob/master/etc/hub.bash_completion.sh

zsh: https://github.com/defunkt/hub/blob/master/etc/hub.zsh_completion
```

访问 Github API 时需要登录, 对应的 OAuth 会保存在 `~/.config/hu ` 中.

#### 使用命令

##### hub clone

可以省去指定远程仓库的部分: `hub clone your-repo-name` == `git clone git@github.com/your-account/your-repo-name`

或者指定用户: `hub clone user/user-repo-name`

##### hub remote add

`hub remote add username` == `git remote add username git://github.com/username/current-repo.git`

##### hub fetch

与 remote add 一样, 输入用户名就可以指定当前操作的仓库执行命令.

##### hub cherry-pick

只需要输入 URL 就可以获取对应的修改并应用到当前分支:

`hub cherry-pick https://github.com/.../.../commit/...`

相当于下面的命令:

```bash
$ git remote add -f username git://github.com/username/repo.git
$ git cherry-pick [commit hash]
```

##### hub fork

功能与 Github 上的 Fork 按钮相同, 对于已经 clone 到本地的仓库, 想要Fork 成自己的仓库只需要执行: `hub fork`, 效果相当于:

```bash
$ git remote add -f username git@github.com:当前操作的仓库名称.git
```

##### hub pull-request

`hub pull-request -b need-merge-repo:branch-name -h some-repo:branch-name`

如果某个 issue 是实现功能的描述, pull request 时需要使用这个 issue 的内容作为正文, 简化 pull request 过程, 可以使用 `-i` 参数:

`hub pull-request -i [issue number] -b need-merge-repo:branch-name -h some-repo:branch-name`

这样做就可以直接将 issue 作为 pull request 的内容来发送.

##### hub checkout

收到 pull request 时, 想要在本地检查该分支运行情况, 可以使用 `hub checkout [pull request url]`, 效果相当于:

```bash
$ git remote add -f -t branch-name git://github.com/your-repo/branch.git
$ git checkout --track -B your-repo-branch-name your-repo/branch-name
```

系统会以 Pull Request 发送方的 "用户名-分支名" 的形式在本地仓库中创建分支.

##### hub create

`hub create` 适用于本地已经创建仓库, Github 端没有创建的情况, 相当于: `git remote add origin git@github.com:username/current-repo.git`

##### hub push

`hub push` 支持向多个远程仓库进行 push 操作: `hub push origin, origin2, origin3 need-push-feature`

##### hub browse

`hub browse` 可以让浏览器打开当前操作的仓库在 Github 上对应的页面, 相当于: `open https://github.com/username/current-repo`

##### hub compare

`hub compare` 可以查看当前特性分支与 master 分支的差别, 用浏览器在 Github 上对应的查看差别的页面. 相当于: `open https://github.com/username/current-repo/compare/current-branch-name`

### Travis CI

使用 Travis CI 用来进行代码的持续集成是很有好处的, 一般情况下编写 `.travis.yml` 的格式为:

```yml
language: ruby # 所使用的语言
rvm: # 需要集成的版本
    - 1.9.2
    - 1.9.3
script: bundle exec rspec spec # 执行测试的相关命令
```

可以通过: `lint.travis-ci.org` 来对 `.travis.yml` 文件进行测试.

## 使用 Github 的开发流程

### Github Flow 流程 -- 以部署为中心的开发模式

必要原则:

- 随时部署, 没有发布概念
- 进行新的开发时要从 master 分支创建新分支
  - 新分支需要具有描述性, 直观表达分支的特性: user-content-cache-key, submodules-init-task ...
- 在新创建的分支中进行提交
- 定期push, 除了 master 分支外, 其他分支都是特性实现分支, 因此提交 push 到特性分支可以备份代码, 且适合进行交流.
- 无需合并时才使用 pull request, 尽早 pull request 能够一边接收反馈一边修改代码.

Github Flow 流程:

- 接到任务
- 创建新分支
  - 未 clone 则进行仓库 clone
  - clone 过的则进行一次 pull
  - 创建特性分支 `git checkout -b feature-branch-name` 并同步分支到远端 `git push -u origin feature-branch-name`
  - 实现新功能
  - 创建 pull request
  - 接收反馈
  - 修正

### Git Flow 流程 -- 以发布为中心的开发模式

Git Flow 流程:

1. 从开发版分支 (develop) 创建工作分支 (feature branches), 实现功能或修正
2. 工作分支 (feature branches) 修改完成后, 与开发版分支 (develop) 合并
3. 重复 1, 2 不断实现功能直到可以发布
4. 创建用于发布的分支 (release branches), 处理发布的各项工作
5. 发布完成后与 master 分支合并, 打上版本标签 (Tag) 进行发布
6. 如果出现 Bug 则以打了标签的版本为基础进行修正 (hotfixes)

流程如图:

![Git Flow 图示][2]

由于 Git Flow 流程较为复杂, 因此一般需要安装 [git-flow][3] 来遵循流程.

使用 git-flow 需要一些初始设置:

```bash
# 使用默认的分支名称
$ git flow init -d

# 选择完成设置后就可以查看一下当前具有的分支
$ git branch -a
```

执行 init 后得到了 develop 分支, 然后需要同步 develop 分支到远端: `git push -u origin develop`

#### 模拟 Git Flow

##### 在 feature 中进行工作

- 从 develop 分支创建 feature 分支
- 在 feature 分支中实现目标功能
- 通过 Github 向 develop 发送 pull request
- 合并到 develop 分支

其中创建分支前需要更新 develop 分支: `git pull`

创建特性分支并确认分支的存在 `git flow feature start [feature-branch-name] && git branch`

每次发起 pull request 并合并完成之后, 再次开发新功能时都需要对 develop 分支拉取代码: `git pull`

    为了避免每次发起 pull request 都要切换分支, 可以在 Github 上仓库的设置页面中将分支设定为默认显示 develop 分支.

经过多次特性添加以及 pull request 之后, 到达需要发布功能的时候, 需要执行以下的步骤:

```bash
# 切换 develop 分支
$ git checkout develop

# 获取最新代码
$ git pull

# 开始 release 分支
$ git flow release start '1.0.0'

# 该分支只处理与发布前准备的相关提交: 版本号变更,
# 预发布环境测试发现的 Bug修正等.
# 但绝对不可以包括需求变更或功能变更等大修改
# 全部处理完成后, 结束发布分支
$ git flow release finish '1.0.0'

# 完成合并后可以查看下版本标签是否正确生成
$ git tag

# 最后将发布更新到远程仓库开发分支
$ git push origin develop

# 然后是 master 分支
$ git checkout master
$ git push origin master

# 再把标签信息更新到远端
$ git push --tags
```

##### hotfix 分支进行的工作

只有当前发布的版本中出现 Bug 或漏洞, 且严重到需要立即处理, 无法等到下一个版本发布时, hotfix 分支才会被创建, 因此 hotfix 都是以发布版本的标签或 master 分支为起点.

首先需要将远程仓库的信息更新到本地: `git fetch origin`

在这里假设以标签 `1.0.0` 作为修复起点: `git flow hotfix start '1.0.1' '1.0.0'`

修复完成后将 hotfix 分支 push 到远端仓库: `git push origin hotfix/1.0.1`, 并发起 pull request.

完成合并后, 再一次更新本地信息: `git fetch origin`.

然后再将 develop 与最新的 hotfix 合并, 如果出现合并问题, 则在 develop 中修复, 而不要改动到目的是修复 master 分支问题的 hotfix.

附: 版本号的分配规则

在使用 x.y.z 格式进行版本管理时的规则如下:

- x 在重大功能变更或新版本不向下兼容时加1, 此时 y, z 归零.
- y 在添加新功能或者删除已有功能时加1, 此时 z 归零.
- z 只在进行内部修改后加1

例子:

- 1.0.0: 最初发布版本
- 1.0.1: 修正了轻微 BUG
- 1.0.2: 修复漏洞
- 1.1.0: 添加新功能
- 2.0.0: 更新整体 UI 并添加新功能

## 通过 Gist 共享代码

Gist 可用于:

- 共享示例代码
- 提供错误信息(粘贴日志内容)
- 代替记事本记录简短代码段

[1]:    https://github.com/github/hub
[2]:    http://nvie.com/img/git-model@2x.png
[3]:    https://github.com/nvie/gitflow
