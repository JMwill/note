// 适配器模式
// 如果对象提供一致的方法，可以直接使用
var googleMap = {
    show: function() {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    show: function() {
        console.log('开始渲染百度地图');
    }
};

var renderMap = function(map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

renderMap(googleMap);
renderMap(baiduMap);

// 如果对象间的方法不一样
var googleMap = {
    show: function() {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    display: function() {
        console.log('开始渲染百度地图');
    }
};

var baiduMapAdapter = {
    show: function() {
        return baiduMap.display();
    }
};

var renderMap = function(map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

renderMap(googleMap);
renderMap(baiduMapAdapter);
