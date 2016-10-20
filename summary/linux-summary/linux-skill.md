# 每个极客都应该知道的Linux技巧记录

## 检查不是由自己运行的程序

```
列出自己运行的程序：
ps aux | grep -v `whoami`

列出最占用时间的前十个程序
ps aux --sort=-%cpu | grep -m 11 -v `whoami`
```

## 将多个文件中的文本替换掉

```
perl -i -pe 's/switchWord/WordYouWant/;' ./*   作用于当前目录下所有文件

find . -name '*.txt' -print | xargs perl -pi -e's/Windows/Linux/ig' *.txt   作用于当前目录及下层目录

find -type f -name '*.txt' -print0 | xargs --null perl -pi -e 's/Windows/Linux/'   只作用于普通文件上
```

## 将系列进程杀死

```
lsof是展示已打开的文件，可以用ps aux替代，grep用于筛选
lsof | grep deleted | grep mysqld | awk '{print $2}' | xargs kill -9
```
