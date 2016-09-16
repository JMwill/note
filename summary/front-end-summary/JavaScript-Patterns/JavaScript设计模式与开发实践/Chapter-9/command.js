/**
 * html code
 *   <body>
 *      <button id="button1">点击按钮1</button>
 *      <button id="button2">点击按钮2</button>
 *      <button id="button3">点击按钮3</button>
 *   </body>
 */

var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

// 一般面向对象做法
var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute();
    };
};

var MenuBar = {
    refresh: function() {
        console.log('刷新菜单目录');
    }
};

var SubMenu = {
    add: function() {
        console.log('增加子菜单');
    },
    del: function() {
        console.log('删除子菜单');
    }
}

var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
};

var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
}
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
}

var DelSubMenuCommand = function(receiver) {
    this.receiver = receiver;
}
DelSubMenuCommand.prototype.execute = function() {
    this.receiver.del();
}

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);

// JavaScripy中的命令模式
var bindClick = function(button, fun) {
    button.onclick = fun;
}

var MenuBar = {
    refresh: function() {
        console.log('刷新菜单页面');
    }
};

var SubMenu = {
    add: function() {
        console.log('增加子菜单');
    },
    del: function() {
        console.log('删除子菜单');
    }
};

bindClick(button1, MenuBar.refresh);
bindClick(button2, SubMenu.add);
bindClick(button3, SubMenu.del);

// 宏命令
var commandOne = {
    execute: function() {
        console.log('execute command one!')
    }
};

var commandTwo = {
    execute: function() {
        console.log('execute command two!')
    }
};

var commandThree = {
    execute: function() {
        console.log('execute command three!')
    }
};

var MacroCommand = function() {
    return {
        commandList: [],
        add: function(command) {
            this.commandList.push(command);
        },
        execute: function() {
            for (var i = 0, command; command = this.commandList[i++]; ) {
                command.execute();
            }
        }
    }
}

var macroCommand = MacroCommand();
macroCommand.add(commandOne);
macroCommand.add(commandTwo);
macroCommand.add(commandThree);

macroCommand.execute();


// 工厂进行对象实例化
var UploadFactory = (function() {
    var createdFlyWeightObjs = {};

    return {
        create: function(uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }
            return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
})();

// 管理器封装外部状态
var uploadManager = (function() {
    var uploadDatabase = {};

    return {
        add: function(id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement('div');
            dom.innerHTML =
                    '<span>文件名：' + fileName + '，文件大小' + fileSize + '</span>' +
                    '<button class="delFile">删除</span>'

            dom.querySelector('.delFile').onClick = function() {
                flyWeightObj.delFile(id);
            };
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };
            return flyWeightObj;
        },
        setExternalState: function(id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

var id = 0;
window.startUpload = function(uploadType, files) {
    for (var i = 0, file; file = files[i++];) {
        var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
    }
};


startUpload('plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
]);

startUpload('flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
]);