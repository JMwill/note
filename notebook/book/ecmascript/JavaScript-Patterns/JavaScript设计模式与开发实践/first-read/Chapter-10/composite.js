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
    };
};

var arriveHomeCommand = MacroCommand();
arriveHomeCommand.add({
    execute: function() {
        console.log('开灯');
    }
});
arriveHomeCommand.add({
    execute: function() {
        console.log('开电视');
    }
});
arriveHomeCommand.add({
    execute: function() {
        console.log('开空调');
    }
});

var cookCommand = MacroCommand();
cookCommand.add({
    execute: function() {
        console.log('煮饭');
    }
});
cookCommand.add({
    execute: function() {
        console.log('煮菜');
    }
});
cookCommand.add({
    execute: function() {
        console.log('开席');
    }
});

var rootCommand = MacroCommand();
rootCommand.add(arriveHomeCommand);
rootCommand.add(cookCommand);
rootCommand.add({
    execute: function() {
        console.log('收拾、清洁');
    }
});

rootCommand.execute();

var Folder = function(name) {
    this.name = name;

    // 增加对父对象的引用
    this.parent = null;
    this.files = [];
};
Folder.prototype.add = function(file) {
    file.parent = this;
    this.files.push(file);
};
Folder.prototype.scan = function() {
    console.log('扫描到文件夹：' + this.name);
    for (var i = 0, file, files = this.files; file = files[i++]; ) {
        file.scan();
    }
};
Folder.prototype.remove = function() {
    if (!this.parent) {
        return;
    }
    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        var file = files[l];
        if (file === this) {
            console.log('正在删除...' + this.name);
            files.splice(l, 1);
        }
    }
};

var File = function(name) {
    this.name = name;
    this.parent = null;
};
File.prototype.add = function(file) {
    // 解决透明性带来的安全问题
    throw new Error('无法在文件中添加文件');
};
File.prototype.scan = function() {
    console.log('扫描到文件：' + this.name);
};
File.prototype.remove = function() {
    if (!this.parent) {
        return;
    }
    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        var file = files[l];
        if (file === this) {
            console.log('正在删除...' + this.name);
            files.splice(l, 1);
        }
    }
}

var folder1 = new Folder('文件夹1');
var file1 = new File('文件1');
var file2 = new File('文件2');
var file3 = new File('文件3');
folder1.add(file1);
folder1.add(file2);
folder1.add(file3);


var folder2 = new Folder('文件夹2');
var file4 = new File('文件4');
var file5 = new File('文件5');
var file6 = new File('文件6');
folder2.add(file4);
folder2.add(file5);
folder2.add(file6);
file6.remove();


var folder3 = new Folder('文件夹3');
var file7 = new File('文件7');
var file8 = new File('文件8');
var file9 = new File('文件9');
folder3.add(file7);
folder3.add(file8);
folder3.add(file9);

var rootFolder = new Folder('文件夹4');
var file10 = new File('文件10');
rootFolder.add(file10);
rootFolder.add(folder1);
rootFolder.add(folder2);
rootFolder.add(folder3);
folder3.remove();

rootFolder.scan();
