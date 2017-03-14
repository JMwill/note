- 怎么使用GitHub来看作者的早期代码呢?

首先将作者的仓库给pull下来, 得到完整的代码. 一般情况下代码都是在master上开发的, 然后不断添加新的功能, 这个时候可以通过:

```bash
# 通过反向查看log记录, 得到第一次提交的hash值
git log --reverse

# 通过新建一个分支来到达相应的commit位置,
# 由于有的时候commit数量过多, 使用简单的后几个字符可能会出现下面的错误:
# --> fatal: 不能同时更新路径并切换到分支'test-branch'。
# --> 您是想要检出 '1753' 但其未能解析为提交么？
# 因此最好使用全部的hash值
git checkout -b read-branch a6ffd97ef150f50eb1a0e0e54edf217831011753

# 这样就到达需要的提交位置, 一般是第一次或初次代码提交的commit. 这个时候就可以看代码了.
# 不过在看完代码后不可能每次都这样来操作, 而且也不可能每次都记住看到了哪个commit. 所以:
# 通过下面的命令来看最近的提交
git log -1

# 然后使用最近的提交hash跟主分支来对比得出之后的log的hash
git log --reverse --ancestry-path a6ffd97ef150f50eb1a0e0e54edf217831011753^..master

或者简便一点的方法

git log --reverse --ancestry-path HEAD^..master

# 然后在结果中找到你想要看的下一个提交的hash, 执行下面的命令
git reset --hard 23842865e973f9aacd58fa935f1fec5c2069de11

# 这就能开始下一进度的代码的阅读了
```

在用这个方法查看源码的时候, 可以通过配置编辑器来进行更好的对比查看修改情况, 在这里用的是vscode这款集成了Git功能的编辑器:

git的配置文件分为三等:

1. 第一等在对应文件夹的下的`.git`文件夹内的`config`文件, 即:`.git/config`
2. 次一等的是`~/.gitconfig`文件, 传递`--global`选项就是读写这个文件的
3. 最后一等是`/etc/gitconfig`文件, 传递`--system`选项就会读写这个文件

通过添加上面对应需要的使用等级的文件的内容:

```
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
```

添加完上述内容, 在使用`git difftool <commit>^ <commit>`时就可以使用vscode来查看文件的修改情况了
