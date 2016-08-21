// 一般的实现
var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('Duck Duck Duck');
    } else if (animal instanceof Chicken) {
        console.log('Ge Ge Ge');
    }
}

function Duck() {};
function Chicken() {};

// makeSound(new Duck());
// makeSound(new Chicken());


// 封装不变的地方
var makeSound = function (animal) {
    if (typeof animal.sound === 'function') {
        animal.sound();
    }
}

function Duck() {};
Duck.prototype.sound = function () { console.log('Duck Duck Duck'); }

function Chicken() {};
Chicken.prototype.sound = function () { console.log('Ge Ge Ge'); }

makeSound(new Duck());
makeSound(new Chicken());
