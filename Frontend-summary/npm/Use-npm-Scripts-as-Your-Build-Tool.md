# Use npm Scripts as Your Build Tool

使用npm作为构建工具, 可以使得构建过程更简便更容易拓展, 并避免多一层抽象带来的未知风险.

要使用npm来作为构建工具, 首先需要创建一个`package.json`, 使用`npm init`按照引导一步步添加信息即可, 或者可以直接`npm init -y`或者`npm init -f`来使用默认设置.

**test命令**. 在`scripts`对象内添加/修改`test`字段, 例子使用mocha: `"test": "mocha folder-to-test/ --require babel-register"`, 随后可以使用`npm test`或者`npm t`来运行测试. npm中定义了一些常规的命令, 可以在`scripts`对象中添加`start`字段, 随后可以用`npm start`来运行`start`定义的命令.

**用户定义命令**. 在`scripts`中可以使用自定义的字段, 这个字段随后可以使用`npm run 字段名`来运行命令. 例子为运行eslint检查. `"eslint": "eslint --cache --fix ./"`, 或者如果想要使用本地环境的eslint, 可以`"eslint": "./node_modules/.bin/eslint --cache --fix ./"`或者`"eslint": "$(npm bin)/eslint --cache --fix ./"`来使用本地安装的包, 同时还可通过`npm run dev`来查看提供的运行时环境变量

**同步运行命令**. 如果需要同步运行某些命令, 可以使用`&&`来拼接命令从而达到目的: `"series-cmd": "npm run eslint && npm run test"`, 随后就可以通过`npm run series-cmd`来同步运行命令.

**异步运行命令**. 如果需要异步运行某些命令, 可以使用`&`来拼接命令从而达到目的: `"parallel-cmd": "npm run eslint & npm run test"`, 随后通过`npm run parallel-cmd`来异步运行命令, 但是由于有时候需要对一些监听命令保持引用, 方便后面`Ctrl-C`来停止监听进程, 这就需要在命令的最后添加`wait`来保持窗口引用, `"parallel-cmd": "npm run eslint & npm run test & wait"`.

**快捷运行命令工具**. 通过安装`npm-run-all`工具, 可以将多个命令以同步或者异步方式来进行组织. `npm i npm-run-all -D`命令会安装需要的包, `-D`表示保存在`devDependencies`字段中, 使用方式直接将npm命令的名字作为参数传入工具即可: `"all-cmd": "npm-run-all cmd-one cmd-two cmd-three"`, 如果需要异步运行则需要添加标签: `"all-cmd": "npm-run-all --parallel cmd-one cmd-two cmd-three"`. 这个工具会自动保持进程引用, 因此无需添加`wati`即可使用中断进程.

**使用通配符运行相似命令**. 安装了`npm-run-all`工具后, 可以使用通配符运行相似的命令, 如定义了`lint:js`以及`lint:css`命令, 则可以定义`"test": "npm-run-all lint:*"`来一次性运行相似的命令, 而不用重复输入`lint:`. 如果需要运行多重修饰的命令, 则可以使用两个通配符来进行匹配, 假设又定义了一个`lint:css:fix`命令, 则可以定义`"test": "npm-run-all lint:**"`来一次性运行所有相似以及多重修饰的命令.

**前置运行命令钩子和后置命令运行钩子**. 对于需要预先运行额外命令的命令, 新建立一个`pre + 源命令名称`的命令就可以自动在源命令运行之前运行`pre + 源命令名称`的命令, 而将前缀`pre`换成`post`则可以在源命令运行后自动运行`post + 源命令名称`的命令.

**传输参数给npm脚本**. 对于一些命令如果需要一个添加标签版本, 一个无标签版本, 一般会将命令复制一份, 但是这样会导致命令的重复. npm实际上允许传输便签给一个命令, 假设一个命令: `"test": mocha folder/ --require babel-register"`, 传输一个watch标签给它以监视文件修改: `"watch:test": "npm test -- --watch"`, 添加一个`--`, npm就会知道后面的标签需要拼接到运行命令的后面.

**传输npm脚本数据到另一个npm脚本上**. 很多时候代码需要经过多重处理才能够合乎项目的构建要求, 这个时候可以使用管道符将数据由一个工具的输出导入到另一个工具的输入. 如css的处理, `"build:css": "node-sass src/index.scss | postcss -c .postcssrc.json | cssmin > public/index.min.css"`, 通过`|`符号, 可以进行数据的导流, 而`>`则是将数据输出到一个文件当中. 需要记住的是: 工具都需要支持标准输入流

**当文件改变时运行npm脚本**. 安装工具`npm i onchange -D`, 由于不是所有的命令都提供文件改变监听功能, 因此需要`onchange`工具来实现监听工作, `"watch:lint": "onchange '**/*.js' '**/*.scss' -- npm run lint"`. 这样在js或者scss文件有修改时都会运行`lint`脚本.

**在npm脚本中使用package.json的变量**. package.json中的变量可以通过`npm run env | grep "npm_package" | less`来查看, 而要在npm脚本中使用package.json的属性则需要在检查出来的名称前加上`$`符号, 如: `"prebuild": "rm -rf public/$npm_package_version/"`, 这样就会删除相应版本的文件夹.

**在npm脚本中使用自定义配置**. package.json中可以添加自定义的属性, 添加后的属性以下划线作分割. 假设在package.json的第一层定义了一个新的config属性, config里面有一个port属性, 即`{..., config: { port: 1007 }}`, 那么通过前面的查看方法, 可以得到在npm脚本中引用的属性名称为`$npm_package_config_port`. 安装工具`npm i http-server -D`, 可以添加一个npm脚本: `"server:create": "http-server public/$npm_package_version -p $npm_package_config_port"`, 以及一个开启页面的命令: `"server:launch": "open http://localhost:$npm_package_config_port"`, 此处的`open`适用于Mac电脑, Ubuntu可以使用`xdg-open`代替, 

如果需要覆盖配置文件的属性可以使用`npm config set folder-name:port 1138`, 这样`http-server`就会使用端口1138而不是1007, 使用`npm config list | grep folder-name`可以找到新增的覆盖属性, 使用`npm config delete folder-name:port`可以将属性删掉.

**使用git钩子运行npm脚本**. 安装工具`npm i husky -D`, 直接在npm脚本中新增命令: `"precommit": "npm run lint"`, 则在使用git进行commit的时候会先运行lint脚本, 如果想要强制通过, 可以在git命令后面增加标签: `git commit -am "comment" --no-verify`就可以跳过lint的结果来执行commit, 或者可以在git进行push时进行lint, 只需要将`precommit`改成`prepush`就可以.

**当运行npm脚本时修改控制台输出等级**. 如`npm start --loglevel silent`或者一样功能的`npm start --slient`和`npm start -s`来减少输出的信息, 还有一些快捷标签如: `-q`表示只输出警告信息, `-d`表示输出信息, `-dd`表示输出更多的信息, 具体的标签可以看[这里][1]

**让npm脚本跨平台兼容**.

1. 安装工具`npm i cross-env -D`. 这个工具可以在多个平台上正确设置环境变量, 如: `"test": "cross-env BABEL_ENV=test mocha folder/ --require babel-register"`.
2. 对于`rm`命令, 需要安装工具`npm i rimraf -D`, 安装完后就可以使用`rimraf folder`来替代`rm -rf folder`.
3. 对于open命令, 可以安装工具: `npm i opn-cli -D`, 安装完成后就可以使用`opn file.html`等功能.
4. win下不能使用`'`号, 因此对于npm脚本中用单引号括起来的命令, 需要用`\"`来代替.
5. 对于`$npm_package_version`这种类型的变量在win下需要改为`%npm_package_version%`这样的形式, 因此需要安装工具: `npm i cross-var -D`, 然后可以`cross-var rimraf folder/$npm_package_version`这样来使得命令可以跨平台使用. 但是对于多个命令复合的npm脚本需要用引号包起来作为一整个字符串传给cross-var来实现替换, 如: `"build:css": "cross-var \"node-sass src/index.scss | postcss -c ... | ... \""`这样使用.

**列出可用npm脚本以及支持tab补全**. 当npm脚本过多的时候, 可以直接使用`npm run`来列出可用的脚本, 或者如果想要让npm脚本支持tab补全, 则可以运行`npm completion >> ~/.bashrc && source ~/.bashrc`就可以. 或者可以安装工具: `npm i ntl -g`, 工具的意思是: npm task list, 因此可以直接在命令行中运行`ntl`来选择需要运行的命令. 

**为npm脚本添加注释**. 由于package.json是一个json文件, 因此想要添加注释的话, 可以使用`"//": "Comments"`来达到目的, 或者直接在命令前添加需要的注释: `"start": "# Run, build, and serve \n\t node index.js"`来实现注释, 这样的注释在`npm run`下能看到很好的排版效果.

**用p-s将npm脚本抽出到其他的文件中**. 安装工具: `npm i p-s -D`, 完成后运行`node_modules/.bin/p-s init`或者`node_modules/.bin/nps init`, 会得到一个`package-scripts.js`文件.

`package-scripts.js`这个文件里面是从package.json中移出来的npm脚本. 原始的npm脚本剩下`start`以及`test`脚本. 里面的内容变成是运行`nps`相应脚本

得到文件后可以通过`npm start -- --help`来查看所有可用的脚本, 如果在npm脚本中没有定义help字段, 则可以直接使用`npm start help`.

然后还需要对`package-scripts.js`文件进行修改, 可以在文件里对脚本添加注释, 也可以添加nps运行help时显示的注释:

```javascript
module.exports = {
    scripts: {
        test: {
            script: 'BABEL_ENV=test mocha folder/ --require babel-register',
            description: 'Run mocha test'
        }
    }
}
```

这样test脚本命令就会在运行`npm run help`时显示对应的脚本注释. 同时, 之前写的用`npm-run-all`运行的脚本, 直接用`nps`运行: `nps lint.js,lint.css,lint.css.fix`. nps能够理解`--parallel`标签. 而在`nps`中不支持`pre`以及`post`, 可以通过`&&`符号, 以及使用`default`等方式来实现:

```javascript
module.exports = {
    scripts: {
        default: 'node index.js && nps build,server',
        test: {
            default: {
                script: 'nps lint,test.run',
                description: 'Run mocha test'
            },
            run: 'BABEL_ENV=test mocha folder/ --require babel-register'
        }
    }
}
```

而对于git钩子脚本, 则需要移动到原来的package.json的scripts中并用nps运行需要的脚本, 如: `"prepush": "nps lint"`

如果想要更方面地使用nps, 则可以将其安装到全局: `npm i p-s -g`, 之后可以直接在命令行内运行`nps lint`

**创建一个bash script来代替复杂的npm script**. 在npm script过于臃肿的时候, 可以将其替换成bash script来更好地管理.

```bash
#!/usr/bin/env bash
npm run lint
BABEL_ENV=test mocha folder/ --require babel-register
```

然后可以将npm script修改为: `"test": "./scripts/test.sh"`. 当然, 不要忘记修改sh文件的可执行权限: `chmod 777 test.sh`, 或递归修改: `chmod -R 777 .`, 而且还可以在sh文件里添加一些输出来显示: `echo "words..."`

**创建node脚本来替代复杂的npm脚本**. 将npm脚本转化成node脚本能够为项目提供更好的可控性以及扩展性.

首先创建一个scripts文件夹: `mkdir scripts`, 然后创建三个文件: `touch scripts/{test,build,server}.js`. 安装工具: `npm i shelljs -D`

```javascript
import { exec } from 'shelljs';
const isWindows = process.platform === 'win32';
const environment = isWindows ? 'set BABEL_ENV=test&&' : 'BABEL_ENV=test';

exec(`${environment} mocha folder/ --require babel-register`);
```

因为文件使用了ES6的一些特性, 因此需要使用`babel-node`来运行脚本: `npm i babel-cli -D`, 并修改npm脚本`"test": "babel-node ./scripts/test.js"`

```javascript
// .babelrc file
{
    "presets": ["es2015", "stage-0"],
    "sourceMaps": "inline",
    "compact": true,
    "env": {
        "test": {
            "plugins": ["babel-plugin-espower"]
        }
    }
}
```

实现build文件:

```javascript
import { rm, exec } from 'shelljs';

const version = process.env.npm_package_version;

exec(`rm -rf public/${ version }`);

// 跨平台
rm('-rf', `public/${ version }`);
```

实现server文件:

```javascript
import { exec } from "shelljs";

const { npm_package_version: version, npm_package_config_port: port } = process.env;
exec(`http-server public/${ version } -p ${ port }`, { async: true }); // async让本命令不会阻塞后续的命令.
exec(`open http://localhost:${ port }`);

// 让打开命令跨平台可以安装一个新的工具: npm i opn-cli -D
exec(`opn http://localhost:${ port }`);
```

[1]: https://docs.npmjs.com/misc/config#shorthands-and-other-cli-niceties