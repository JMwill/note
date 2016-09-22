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
