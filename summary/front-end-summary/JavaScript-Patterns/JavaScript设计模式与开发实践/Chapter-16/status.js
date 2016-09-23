// 普通电灯程序
var Light = function() {
    this.state = 'off';
    this.button = null;
};

Light.prototype.init = function() {
    var button = document.createElement('button'),
        self = this;

    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);
    this.button.onclick = function() {
        self.buttonWasPressed();
    }
};

Light.prototype.buttonWasPressed = function() {
    if (this.state === 'off') {
        console.log('开灯');
        this.state = 'on';
    // } else if (this.state ==='weaklight') {
    //     console.log('强光');
    //     this.state = 'strongLight';
    } else {
        console.log('关灯');
        this.state = 'off';
    }
};

var light = new Light();
light.init();

// 改进为使用状态模式
// OffLightState
var OffLightState = function(light) {
    this.light = light;
};

OffLightState.prototype.buttonWasPressed = function() {
    console.log('弱光');
    this.light.setState(this.light.weakLightState);
};

// WeakLightState
var WeakLightState = function(light) {
    this.light = light;
};

WeakLightState.prototype.buttonWasPressed = function() {
    console.log('强光');
    this.light.setState(this.light.strongLightState);
};

// StrongLightState
var StrongLightState = function(light) {
    this.light = light;
};

StrongLightState.prototype.buttonWasPressed = function() {
    console.log('关灯');
    this.light.setState(this.light.offLightState);
};

var Light = function() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
};

Light.prototype.init = function() {
    var button = document.createElement('button'),
        self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState;
    this.button.onclick = function() {
        self.currState.buttonWasPressed();
    };
};

Light.prototype.setState = function(newState) {
    this.currState = newState;
};

var light = new Light();
light.init();

// 弥补js缺少抽象类的变通方式，添加提醒功能
var State = function() {};
State.prototype.buttonWasPressed = function() {
    throw new Error('父类的buttonWasPressed方法必须被重写');
};

var OffLightState = function(light) {
    this.light = light;
};
OffLightState.prototype = new State();
OffLightState.prototype.buttonWasPressed = function() {
    console.log('开灯');
    this.light.setState(this.light.weakLightState);
};

// 文件上传的例子，更复杂的切换条件
window.external.upload = function(state) {
    console.log(state);
};

var plugin = (function() {
    var plugin = document.createElement('embed');
    plugin.style.display = 'none';
    plugin.type = 'application/txftn-webkit';

    plugin.sign = function() {
        console.log('开始文件扫描');
    };
    plugin.pause = function() {
        console.log('暂停文件上传');
    };
    plugin.uploading = function() {
        console.log('开始文件上传');
    };
    plugin.del = function() {
        console.log('删除上传文件');
    };
    plugin.done = function() {
        console.log('文件上传完毕');
    };

    document.body.appendChild(plugin);
    return plugin;
})();

var Upload = function(fileName) {
    this.plugin = plugin;
    this.fileName = fileName;
    this.button1 = null;
    this.button2 = null;
    this.state = 'sign';
};

Upload.prototype.init = function() {
    var self = this;
    this.dom = document.createElement('div');
    this.dom.innerHTML =
        '<span>文件名称：' + this.fileName + '</span>'+
        '<button data-action="button1">扫描中</button>' +
        '<button data-action="button2">删除</button>';
    document.body.appendChild(this.dom);
    this.button1 = this.dom.querySelector('[data-action="button1"]');
    this.button2 = this.dom.querySelector('[data-action="button2"]');
    this.bindEvent();
}

Upload.prototype.bindEvent = function() {
    var self = this;
    this.button1.onclick = function() {
        if (self.state === 'sign') {
            console.log('扫描中，点击无效...');
        } else if (self.state === 'uploading') {
            self.changeState('pause'); // 上传中，切换到暂停
        } else if (self.state === 'pause') {
            self.changeState('done'); // 暂停中，切换到上传中
        } else if (self.state === 'done') {
            console.log('文件已经上传，点击无效');
        } else if (self.state === 'error') {
            console.log('文件上传失败，点击无效');
        }
    };

    this.button2.onclick = function() {
        if (
            self.state === 'done' ||
            self.state === 'error' ||
            self.state === 'pause'
        ) { // 上传完成、失败、暂停的情况下可以删除
            self.changeState('del');
        } else if (self.state === 'sign') {
            console.log('文件正在扫描中，不能删除');
        } else if (self.state === 'uploading') {
            console.log('文件正在上传中，不能删除');
        }
    };
}

Upload.prototype.changeState = function(state) {
    switch (state) {
        case 'sign':
            this.plugin.sign();
            this.button1.innerHTML = '扫描中，任何操作无效';
            break;
        case 'uploading':
            this.plugin.uploading();
            this.button1.innerHTML = '正在上传，点击暂停';
            break;
        case 'pause':
            this.plugin.pause();
            this.button1.innerHTML = '已暂停，点击继续上传';
            break;
        case 'done':
            this.plugin.done();
            this.button1.innerHTML = '上传完成';
            break;
        case 'error':
            this.button1.innerHTML = '上传失败';
            break;
        case 'del':
            this.plugin.del();
            this.dom.parentNode.removeChild(this.dom);
            console.log('删除完成');
            break;
    }
    this.state = state;
};

// test
var uploadObj = new Upload('设计模式');
uploadObj.init();
window.external.upload = function(state) {
    uploadObj.changeState(state);
};
window.external.upload('sign');
setTimeout(function() {
    window.external.upload('uploading');
}, 1000);
setTimeout(function() {
    window.external.upload('done');
}, 5000);

// 状态模式重构文件上传程序
var Upload = function(fileName) {
    this.plugin = plugin;
    this.fileName = fileName;
    this.button1 = null;
    this.button2 = null;
    this.signState = new SignState(this);
    this.uploadingState = new UploadingState(this);
    this.pauseState = new PauseState(this);
    this.doneState = new DoneState(this);
    this.errorState = new ErrorState(this);
    this.currState = this.signState;
};

Upload.prototype.init = function() {
    var self = this;
    this.dom = document.createElement('div');
    this.dom.innerHTML =
        '<span>文件名称：' + this.fileName + '</span>'+
        '<button data-action="button1">扫描中</button>' +
        '<button data-action="button2">删除</button>';
    document.body.appendChild(this.dom);
    this.button1 = this.dom.querySelector('[data-action="button1"]');
    this.button2 = this.dom.querySelector('[data-action="button2"]');
    this.bindEvent();
};

Upload.prototype.bindEvent = function() {
    var self = this;
    this.button1.onclick = function() {
        self.currState.clickHandler1();
    };
    this.button2.onclick = function() {
        self.currState.clickHandler2();
    };
};

Upload.prototype.sign = function() {
    this.plugin.sign();
    this.currState = this.signState;
}

Upload.prototype.uploading = function() {
    this.button1.innerHTML = '正在上传，点击暂停';
    this.plugin.uploading();
    this.currState = this.uploadingState;
};

Upload.prototype.pause = function() {
    this.button1.innerHTML = '已暂停，点击继续上传';
    this.plugin.pause();
    this.currState = this.pauseState;
};

Upload.prototype.done = function() {
    this.button1.innerHTML = '上传完成';
    this.plugin.done();
    this.currState = this.doneState;
};

Upload.prototype.error = function() {
    this.button1.innerHTML = '上传失败';
    this.currState = this.errorState;
};

Upload.prototype.del = function() {
    this.plugin.del();
    this.dom.parentNode.removeChild(this.dom);
};

var StateFactory = (function() {
    var State = function() {};
    State.prototype.clickHandler1 = function() {
        throw new Error('子类必须重写父类的方法');
    };
    State.prototype.clickHandler2 = function() {
        throw new Error('子类必须重写父类的方法');
    };

    return function(param) {
        var F = function(uploadObj) {
            this.uploadObj = uploadObj;
        }
        F.prototype = new State();

        for (var i in param) {
            F.prototype[i] = param[i];
        }
        return F;
    }
})();

var SignState = StateFactory({
    clickHandler1: function() {
        console.log('扫描中，点击无效...');
    },
    clickHandler2: function() {
        console.log('文件正在上传中，不能删除');
    }
});

var UploadingState = StateFactory({
    clickHandler1: function() {
        this.uploadObj.pause();
    },
    clickHandler2: function() {
        console.log('文件正在上传中，不能删除');
    }
});

var PauseState = StateFactory({
    clickHandler1: function() {
        this.uploadObj.uploading();
    },
    clickHandler2: function() {
        this.uploadObj.del();
    }
});

var DoneState = StateFactory({
    clickHandler1: function() {
        console.log('文件已经上传完成，点击无效');
    },
    clickHandler2: function() {
        this.uploadObj.del();
    }
});

var ErrorState = StateFactory({
    clickHandler1: function() {
        console.log('文件上传失败，点击无效');
    },
    clickHandler2: function() {
        this.uploadObj.del();
    }
});

var uploadObj = new Upload('设计模式');
uploadObj.init();

window.external.upload = function(state) {
    uploadObj[state]();
};

window.external.upload('sign');

setTimeout(function() {
    window.external.upload('uploading');
}, 1000);
setTimeout(function() {
    window.external.upload('done');
}, 5000);


// JavaScript版的状态机
var Light = function() {
    this.currState = FSM.off;
    this.button = null;
};

Light.prototype.init = function() {
    var button = document.createElement('button'),
        self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function() {
        self.currState.buttonWasPressed.call(self);
    }
};

var FSM = {
    off: {
        buttonWasPressed: function() {
            console.log('关灯');
            this.button.innerHTML = '下一次按我是开灯';
            this.currState = FSM.on;
        }
    },
    on: {
        buttonWasPressed: function() {
            this.button.innerHTML = '下一次按我是关灯';
            this.currState = FSM.off;
        }
    }
};

var light = new Light();
light.init();

// 使用闭包来完成对象创建
var delegate = function(client, delegation) {
    return {
        buttonWasPressed: function() { // 将客户操作委托给delegation对象
            return delegation.buttonWasPressed.apply(client, arguments);
        }
    }
};

var FSM = {
    off: {
        buttonWasPressed: function() {
            console.log('关灯');
            this.button.innerHTML = '下一次按我是开灯';
            this.currState = this.onState;
        }
    },
    on: {
        buttonWasPressed: function() {
            this.button.innerHTML = '下一次按我是关灯';
            this.currState = this.offState;
        }
    }
};

var Light = function() {
    this.offState = delegate(this, FSM.off);
    this.onState = delegate(this, FSM.on);
    this.currState = this.offState;
    this.button = null;
};

Light.prototype.init = function() {
    var button = document.createElement('button'),
        self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function() {
        self.currState.buttonWasPressed();
    }
};

var light = new Light();
light.init();

// 另一种实现有限状态机的方法是通过表驱动来实现  https://github.com/jakesgordon/javascript-state-machine
