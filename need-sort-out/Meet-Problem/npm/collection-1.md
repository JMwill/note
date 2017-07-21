# npm 问题收集

## 安装node-sass失败

不管是离线安装或者由于网络的原因, 安装node-sass的二进制包都有可能出错, 这个时候, 可以通过下载对应版本的二进制包, 并在本地运行简单的服务器用于返回数据以供下载, 就能够解决这个问题.

除了通过错误信息得到需要的二进制版本名外, 还可以通过执行下面的命令得到:

```js
node -p "[process.platform, '-', process.arch, '-', process.versions.modules].join('')"
```

得到后在: `https://github.com/sass/node-sass-binaries` 中可以下载到对应的包

得到对应包后运行简单的服务器如:

```sh
python -m SimpleHTTPServer # python 2

python3 -m http.server # python 3
```

然后通过设定sass二进制包的下载路径就可以让安装通过, 设定的方法可以是:

Variable name    | .npmrc parameter | Process argument   | Value
-----------------|------------------|--------------------|------
SASS_BINARY_NAME | sass_binary_name | --sass-binary-name | path
SASS_BINARY_SITE | sass_binary_site | --sass-binary-site | URL
SASS_BINARY_PATH | sass_binary_path | --sass-binary-path | path

```sh
export SASS_BINARY_SITE=http://example.com/

# 设定.npmrc
sass_binary_site=http://example.com/

# 或者在安装时
npm install node-sass --sass-binary-site=http://example.com/
```

使用提供链接下载的方法时, 需要注意的是, npm会在默认是在npm版本下的目录里面找包的, 因此 `http://ecample.com/` 后应该加上 `v4.5.0/` 后接包名并将包放到对应的文件夹下提供服务就可以. 或者使用设定路径的方式.
