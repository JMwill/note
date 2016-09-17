// 需要对50种内衣拍照，因此生产了50个模特来进行试穿衣服拍照
// 虽然现在看是不合理的做法，但程序中常常会出现这些情况
var Model = function(sex, underwear){
    this.sex = sex;
    this.underwear = underwear;
}
Model.prototype.takePhoto = function(){
    console.log('sex=' + this.sex + ' underwear=' + this.underwear);
}

for (var i = 1; i <= 50; i++) {
    var maleModel = new Model('male', 'underwear' + i);
    maleModel.takePhoto();
}
for (var j = 1; j <= 50; j++) {
    var femaleModel = new Model('female', 'underwear' + j);
    femaleModel.takePhoto();
}

// 改进，隐藏underwear，只暴露性别
// 下例中，性别是内部状态，内衣是外部状态，通过区分内部状态，大大减少系统中的对象数量
var Model = function(sex) {
    this.sex = sex;
}

Model.prototype.takePhoto = function() {
    console.log('sex=' + this.sex + ' underwear=' + this.underwear);
}
var maleModel = new Model('male');
var femaleModel = new Model('female');

for (var i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i;
    maleModel.takePhoto();
}
for (var j = 1; j <= 50; j++) {
    maleModel.underwear = 'underwear' + j;
    maleModel.takePhoto();
}


// 上传对象的享元模式
var Upload = function(uploadType) {
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function(id) {
    uploadManager.setExternalState(id, this);
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
}
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

            dom.querySelector('.delFile').onclick = function() {
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


// 通用对象池实现
var objectPoolFactory = function(createObjFn) {
    var objectPool = [];
    return {
        create: function() {
            var obj = objectPool.length === 0 ?
                createObjFn.apply(this, arguments) :
                objectPool.shift();
            return obj;
        },
        recover: function(obj) {
            objectPool.push(obj);
        }
    }
};
var iframeFactory = objectPoolFactory(function() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.onload = function() {
        iframe.onload = null;
        iframeFactory.recover(iframe);
    }
    return iframe;
});
var iframe = iframeFactory.create();
iframe.src = 'http://baidu.com';
var iframe1 = iframeFactory.create();
iframe1.src = 'http://qq.com';
setTimeout(function() {
    var iframe2 = iframeFactory.create();
    iframe2.src = 'http://163.com';
}, 3000);