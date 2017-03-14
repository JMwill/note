var App = {};

// 用于将多行文本截断为想要的长度，目前能够对各种大小字体
// 进行切分，但是对于过小（如：font-size < 13）的字体
// 效果并飞很好。目前只是一个想法的实现。
+(function (Container) {
    if (!Container) { Container = window; }
    var MAX_WHILE = 20;
    
    var rulerElem = document.createElement('div');
    rulerElem.className += ' ' + 'any-line-dot';
    
    var ruler;
        
    var _getVisualLen = function (str) {
        ruler.innerHTML = str;
        return ruler.offsetWidth;
    };
    
    var _copyStyle = function (from, to, styleName) {
        var fromStyle = document.defaultView.getComputedStyle(from, '');
        if (!styleName) {
            to.style.cssText = fromStyle.cssText;
        } else {
            to.style[styleName] = fromStyle[styleName];
        }
    }
    
    var trimLine = function (str, line, elem, options) {
        // 添加尺子
        if (!ruler) {
            // add ruler
            document.querySelector('body').appendChild(rulerElem);
            ruler = Array.prototype.slice.call(
                document.getElementsByClassName('any-line-dot'),
                0
            ).pop();
            
            // add Style
        }
        _copyStyle(elem, ruler, 'font-size');
        
        // 判断是否有必要做切断
        var strWidth = _getVisualLen(str);
        var elemWidth = parseInt(window.getComputedStyle(elem).width);
        var trimWidth = line * elemWidth;
        if (_getVisualLen(str) < trimWidth) { return str; }
        
        var trimRate = trimWidth / strWidth;
        var oneWordWidth = Math.ceil(_getVisualLen(str) / str.length) * 1.5;
        var returnWords = '';
        
        var offset = trimWidth - _getVisualLen(returnWords);
        var trimIndex = Math.floor(str.length * trimRate);
        
        var counter = 0;
        do {
            if (offset > oneWordWidth) {
                returnWords = str.slice(0, trimIndex);
                trimRate = trimRate - trimRate * trimRate;
            } else {
                returnWords = str.slice(0, trimIndex);
                trimRate = trimRate + trimRate * trimRate;
            }
            trimIndex = Math.floor(str.length * trimRate);
            offset = trimWidth - _getVisualLen(returnWords);
            
            // 终止计数，防止死循环
            counter++;
        } while ((offset > oneWordWidth || offset < -oneWordWidth) && counter < MAX_WHILE)
        
        return returnWords;
    }
    
    var old;
    
    function noConflict() {
        try {
            Container.fn.trimLine = old;
        } catch (e) {
            Container.trimLine = old;
        }
    }
    
    trimLine.noConflict = noConflict;
    
    try {
        old = Container.fn.trimLine;
        Container.fn.trimLine = trimLine;
    } catch (e) {
        old = Container.trimLine;
        Container.trimLine = trimLine;
    }
    
    
    
    
}(App));


$(function () {
    var allP = document.getElementsByTagName('p');
    var allP = Array.prototype.slice.call(allP, 0);
    allP.forEach(function (p, i) {
        var elem = allP[i];
        var text = elem.textContent;
        
        elem.innerHTML = App.trimLine(text, 1.2, elem);
    });
});