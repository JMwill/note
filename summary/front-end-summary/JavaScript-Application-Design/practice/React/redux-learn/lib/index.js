'use strict';

var _redux = require('redux');

//var reducer0 = (state, action) => {
//console.log('reducer0 was called with state', state, 'and action', action);
//}

//var store0 = createStore(reducer0);

//console.log('store0 state after initialization:', store0.getState());

var reducer1 = function reducer1() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    console.log('reducer 1 was called with state', state, 'and action', action);
    return state;
}; // 02
//import { createStore } from 'redux';
//var store = createStore(() => {});

// 03
//var reducer = (...args) => {
//console.log('Reducer was called with args', args);
//};

//var store1 = createStore(reducer);


// 04 


var store1 = (0, _redux.createStore)(reducer1);

console.log('store 1 state after initialization: ', store1.getState());