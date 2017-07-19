# 廖雪峰Git学习

## 初步入门

1. 安装完成后需要对git进行配置，`git config --global user.name "name"`，`git config --global user.email "emial@domain.com"`使用config进行配置`git config`，`--global`是指定全局配置，可以对每一个仓库进行配置，而不使用全局配置。
2. `git diff`用于查看所有的修改，当后接文件名的时候代表查看文件的修改。
3. `git log`用于查看提交的记录，通过添加参数`--pretty=online`可以进行单行简略的查看。
4. 通过`git reset --hard HEAD^`来进行前一版本的回退，两个就`HEAD^^`，版本较多时可以使用`HEAD~100`这样的形式来回退，想要再回到回退前的版本的话，就需要在hard后接上版本的版本id即那一长串数字字母组合的commit。如果回退版本后忘记回退前的版本id想要查看回退前的版本的id可以通过使用`git reflog`查看命令历史以确定要回退的版本。
5. 查看工作区和版本库里面最新版本的区别: `git diff HEAD -- filename.txt`查看特定文件，没有文件名就查看全部。
6. 丢弃工作区的改动`git checkout -- filename.txt`，丢弃全部用`.`号。将文件撤出暂存区`git reset HEAD filename.txt`，撤出全部用`.`。
7. 删除文件后可以使用`git rm filename.txt`来真的将删除添加到暂存区，或者使用checkout撤销删除，reset撤出暂存区。

## 远程仓库

1. 如果主文件夹下没有.ssh目录以及目录内没有id_rsa和id_rsa.pub这两个文件就需要创建一个SSH key`ssh-keygen -t rsa -C "myemail@domain.com`之后一路回车。
2. 关联远程版本库可以使用`git remote add origin git@server-name:path/repo-name.git`，username的部分写错不能提交。origin可以修改成喜欢的名字。
3. 第一次把本地所有内容提交到远程库上使用`git push -u origin master`，git会把本地master和远程master关联起来。以后就可以直接使用`git push`。
4. 克隆一个版本库`git clone git@server-name:path/repo-name.git`。

## 分支管理

1. 创建并切换分支`git checkout -b branchname`，相当于`git branch branchname`然后`git checkout branchname`，
2. 查看分支`git branch`。
3. 合并指定分支到当前分支`git merge branchname`，将branchname的内容合并到当前分支。
4. 删除分支`git branch -d branchname`。
5. 恢复删除的分支可以这样做`git branch branchname delBranchId`。
6. 想使用生动的例子显示log的情况可以使用`git log --graph --pretty=oneline --abbrev-commit`。
7. 通过`--no-ff`参数能够在合并分支时生成一个新的commit能够记录分支信息，避免删除分支的时候丢掉分支信息。`git merge --no-ff -m "merge with no-ff" branchname`因为会生成新提交，所以需要添加`-m参数`,
8. 当需要进行bug修复而手头上的工作没有完成的时候，可以通过`git stash`将工作现场保留，然后创建bug分支来修复bug，修复完成并删除bug分支后可以通过使用`git stash pop`来恢复工作现场并删除stash中的内容。如果不想删除stash内容，可以通过`git stash apply`恢复，需要删除时使用`git stash drop`，`git stash list`用于查看stash内的内容。
9. 没有完全合并的分支需要删除时可以通过添加`-D`参数来强行删除`git branch -D branchname`。
10. 通过`git remote`可以查看远程库的信息添加`-v`参数能够显示更加详细的信息，这样可以查看是否具有推送以及抓取的权限。
11. 创建远程origin的branchname到本地进行开发，可以使用命令`git checkout -b branchname origin/branchname`。当本地分支与远程分支没有进行链接的时候，通过命令`git branch --set-upstream branchname origin/branchname`来建立链接

## 标签管理

1. 使用`git tag tagname`可以默认将标签打到HEAD上
2. 需要对以前的提交打标签可以使用`-a`指定标签名`-m`指定说明文字，`git tag -a tagname -m "comments" commentID`
3. 使用`git show tagname`可以查看说明文字
4. 通过`-s`参数用私钥签名一个标签`git tag -s tagname -m "comments" commentID`（签名需要安gpg，ubuntu默认安装了）
5. 使用`git tag`命令查看所有标签
6. 删除标签通过`-d`参数来进行`git tag -d tagname`。
7. 推送某个标签到远程`git push origin tagname`，或者一次性推送全部尚未推送到远程的本地标签`git push origin --tags`。
8. 删除远程标签需要先从本地删除`git tag -d tagname`，然后从远程删除`git push origin :refs/tags/tagname`

## 自定义Git

1. 显示颜色`git config --global color.ui true`。
2. 使用.gitignore文件来忽略不需要提交或包含敏感信息的文件。忽略原则是：
    + 忽略操作系统自动生成的文件，比如缩略图等；
    + 忽略编译生成的中间文件、可执行文件等；
    + 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。
3. git别名配置`git config --global alias.st status`，配置完后就可以直接`git st`来使用代表`git status`，`--global`参数代表全局，不加代表对当前仓库有效，例子：`git config --global alias.last 'log -l'`：显示最后一次提交信息，使用`git last`，`git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`：更好的展示格式，使用`git lg`。配置文件`.gitconfig`存在`.git/config`文件夹下，配置出错时可以直接删除重新用命令配置。

## 搭建Git服务器

1. 安装git，然后创建一个git用户`sudo adduser git`
2. 创建证书登陆：收集所有需要登录的用户的公钥，就是他们自己的`id_rsa.pub`文件，把所有公钥导入到`/home/git/.ssh/authorized_keys`文件里，一行一个。
3. 初始化Git仓库：选定一个目录作为Git仓库，假定是`/srv/sample.git`，在`/srv`目录下输入命令：`sudo git init --bare sample.git`，Git就会创建一个裸仓库，裸仓库没有工作区，因为服务器上的Git仓库纯粹是为了共享，所以不让用户直接登录到服务器上去改工作区，并且服务器上的Git仓库通常都以.git结尾
4. 把owner改为git：`sudo chown -R git:git sample.git`
5. 禁用shell登陆，出于安全考虑，第二步创建的git用户不允许登录shell，这可以通过编辑/etc/passwd文件完成。找到类似下面的一行：`git:x:1001:1001:,,,:/home/git:/bin/bash`改为`git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell`，git用户可以正常通过ssh使用git，但无法登录shell，因为我们为git用户指定的git-shell每次一登录就自动退出
6. 克隆远程仓库：通过`git clone`命令克隆远程仓库`git clone git@server:/srv/sample.git`
7. 人员过多的时候可以通过[Gitosis][gitosis site]来管理公钥
8. 权限控制可以使用[Gitolite][gitolite site]




[gitosis site]:             https://github.com/res0nat0r/gitosis
[gitolite site]:            https://github.com/sitaramc/gitolite