'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // 02
//import { createStore } from 'redux';
//var store = createStore(() => {});

// 03
//var reducer = (...args) => {
//console.log('Reducer was called with args', args);
//};

//var store1 = createStore(reducer);


// 04 
//import { createStore } from 'redux';
//var reducer0 = (state, action) => {
//console.log('reducer0 was called with state', state, 'and action', action);
//}

//var store0 = createStore(reducer0);

//console.log('store0 state after initialization:', store0.getState());

//var reducer1 = (state = {}, action) => {
//console.log('reducer 1 was called with state', state, 'and action', action);
//return state;
//};

//var store1 = createStore(reducer1);

//console.log('store 1 state after initialization: ', store1.getState());

//var reducer2 = (state = {}, action) => {
//console.log('reducer 2 was called with state', state, 'and action', action);

//switch (action.type) {
//case 'SAY_SOMETHING':
//return {
//...state,
//message: action.value
//}
//default:
//return state
//}
//};

//var store2 = createStore(reducer2);
//console.log('store 2 state after initialization: ', store2.getState());


// 05


var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var userReducer = function userReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    console.log('user Reducer was called with state', state, 'and action', action);
    switch (action.type) {
        case 'SET_NAME':
            return _extends({}, state, {
                name: action.name
            });
        default:
            return state;
    }
};

var itemsReducer = function itemsReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    console.log('itemsReducer was called with state', state, 'and action', action);
    switch (action.type) {
        case 'ADD_ITEM':
            return [].concat(_toConsumableArray(state), [action.item]);
        default:
            return state;
    }
};

var reducer = (0, _redux.combineReducers)({
    user: userReducer,
    items: itemsReducer
});

var store0 = (0, _redux.createStore)(reducer);

console.log('\n', '### It starts here');
console.log('store 0 state after initialization:', store0.getState());

//store0.dispatch({
//type: 'AN_ACTION'
//});
//console.log('store 0 state after initialization:', store0.getState());

var setNameActionCreator = function setNameActionCreator(name) {
    return {
        type: 'SET_NAME',
        name: name
    };
};

store0.dispatch(setNameActionCreator('bob'));
console.log('sotre 0 state after action SET_NAME: ', store0.getState());