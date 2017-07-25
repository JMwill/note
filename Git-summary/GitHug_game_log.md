# GitHug通关记录

#### 关卡一：初始化git版本库

    git init

#### 关卡二：填写使用者信息

    git config --global user.email "website@domain.com"
    git config --global user.name "will"

#### 关卡三：添加文件到存储区

    git add filename

#### 关卡四：提交文件或修改

    git commit -m 'comment'

#### 关卡五：克隆仓库

    git clone repository_url

#### 关卡六：克隆仓库到指定目录

    git clone repository_url the_folder_you_want

#### 关卡七：添加忽略文件

    在.gitignore文件中添加需要忽略的文件，通过添加*号前缀进行全体匹配，如：*.txt将会匹配所有以txt结尾的文件

#### 关卡八：忽略某个文件类型时，保留某个文件

    在.gitignore文件中添加完需要忽略的文件后，通过添加!号前缀进行反忽略匹配，如：!need.txt将不会忽略need.txt文件

#### 关卡九：查看未追踪的文件

    git status

#### 关卡十：查看将要提交的文件数

    git status

#### 关卡十一：将删除文件的改动添加到暂存区

    git rm filename

#### 关卡十二：将文件从暂存区撤出

    git rm --cached filename

#### 关卡十三：将当前工作进度保存

    git stash [save "message"] save用于添加说明，是可选项，-k选项能够保存当前工作进度同时保持暂存区不被重置

#### 关卡十四：对文件重命名

    git mv oldfilename newfilename 这个操作相当于：mv oldfilename newfilename && git add newfilename && git rm oldfilename

#### 关卡十五：修改仓库结构

    mkdir yourfolder
    git mv yourfile yourfolder

#### 关卡十六：查看提交的信息

    git log

#### 关卡十七：对当前提交打上标签

    git tag "tagname"

#### 关卡十八：推送当前标签

    git push --tags或者git push origin <tag_name>

#### 关卡十九：不重建快照，修改commit内容

    进行添加或者删除等操作后，git commit --amend

#### 关卡二十：将提交时间更改为未来时间

    git commit -m 'future' --date "Thu Jan 15 16:59:50 CST 2016"

#### 关卡二十一：将部分暂存文件撤出暂存区

    git reset HEAD the_reset_file

#### 关卡二十二：将当前提交重置并保持当前状态

    git reset --soft HEAD~

#### 关卡二十三：丢弃当前改动

    git checkout -- filename，--可以不写

#### 关卡二十四：查看远程库名字

    git remote

#### 关卡二十五：查看远程库详细信息

    git remote -v

#### 关卡二十六：从远程库拉代码

    git pull origin HEAD， HEAD是必需的，不然git会自动在origin下创建一个master的版本。

#### 关卡二十七：添加远程库地址

    git remote add <branch_name> <remote_url>

#### 关卡二十八：本地库与远程库出现偏离，本地库分支与远程库同时有修改并commit需要进行rebase

    git pull origin master && git push origin master

    通常可以使用pull下来后进行merge然后提交，不过如果想要避免创建历史，可以使用rebase：git rebase -i <branch>，然后push。如果rebase出现冲突进行冲突修正后使用：git rebase --continue，任何时候可以使用git rebase --abort来取消rebase且状态回滚

#### 关卡二十九：查看修改的状态属性

    git diff ，添加--stat可以查看修改的汇总

#### 关卡三十：查看有谁修改过文件

    git blame filename

#### 关卡三十一：新建分支

    git branch branchname，或者可以通过git checkout -b branchname进行分支新建并切换到新建分支

#### 关卡三十二：新建并切换分支

    git branch branchname && git checkout branchname或者使用git checkout branchname

#### 关卡三十三：签出到标签并新建以标签为基础的分支

    git checkout -b newbranchname tagname

#### 关卡三十四：分支名和标签名相同造成的冲突如何解决

    git checkout -b newbranchname tags/tagname

#### 关卡三十五：在最近一次提交前进行分支新建

    git branch branchname HEAD~1，或者<sha1-of-commit>，git checkout branchname
    或者使用简洁方法：git checkout -b branchname HEAD~1或者HEAD^

#### 关卡三十六：删除分支

    git branch -d delete_branch

#### 关卡三十七：推送新分支

    git push origin branchname

#### 关卡三十八：合并分支到当前分支

    git merge branchname

#### 关卡三十九：获取远程修改

    git fetch origin

#### 关卡四十：重置头指针到新分支

    git rebase master branchname 命令将主分支的指向宠溺

#### 关卡四十一： 优化仓库

    git repack -a -d或者git repack -A -d

#### 关卡四十二：使用cherry-pick，来合并提交

    在想要合并的分支，使用git cherry-pick <commit-hash>，或者使用git cherry-pick <commit-hash> master或者使用git cherry-pick branchname^ master

#### 关卡四十三：使用git grep进行查找

    git grep -n string_you_want 其中-n参数用于显示行号

#### 关卡四十四：使用rebase进行commit修改，能够修改前几次的commit内容

    git rebase -i HEAD^^ 这样可以对前两次的提交内容进行修改，根据下面的提示使用reword或者其他选项替换pick，保存退出后会进入修改文件，进行修改后保存退出就能够在git log中看到修改后的内容

#### 关卡四十五：合并多个commit

    git rebase -i <initial commit hash>，可以合并从开始到最后一次提交的commit内容，修改方式类似于关卡四十四，选项需要使用squash

#### 关卡四十六：多个提交合并一起提交

    git merge --squash feature_branch master
    git commit

#### 关卡四十七：修改提交信息的顺序

    git rebase -i <commit hash>
    在修改界面调整pick后内容的顺序，保存后退出就可以应用修改。

#### 关卡四十八：查看制造错误的提交

    git bisect start
    git bisect bad  默认为当前最新提交
    git bisect good <commit hash> 可以通过测试的提交
    git bisect run make test  使用run运行测试命令

#### 关卡四十九：仅仅进行部分内容提交，同时不删除已经更改的内容

    git add -p featurefile
    输入e对不想提交的行添加#号能够进行部分提交

#### 关卡五十：查看最近工作过的branch

    git reflog，通过输出能够看到最近的checkout可以查看到最近切换过的branch

#### 关卡五十一：撤销以前的某一次提交，同时不更改需要撤销提交之后的提交

    git revert -e <commit-hash>

#### 关卡五十二：对于撤销的提交重新再提交

    使用git reflog查看撤销的提交记录，如果是刚撤销，一般最近的撤销记录是第二条
    使用git cherry-pick <commit-hash> 进行恢复

#### 关卡五十三：修正冲突

    在使用git merge branchname masterbranch 
    出现冲突，通过增删进行修正。然后提交修改

#### 关卡五十四：使用submodule

    通过git submodule add repository_url

#### 