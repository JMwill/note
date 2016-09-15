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
