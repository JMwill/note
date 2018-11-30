'use strict';

var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var itemsReducer = function itemsReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    console.log('items Reducer was called with state', state, 'and action', action);
    switch (action.type) {
        case 'ADD_ITEM':
            return [].concat(_toConsumableArray(state), [action.item]);
        default:
            return state;
    }
};

var reducer = (0, _redux.combineReducers)({ items: itemsReducer });
var store = (0, _redux.createStore)(reducer);

store.subscribe(function () {
    console.log('store has been updated. Latest store state:', store.getState());
});

var addItemActionCreator = function addItemActionCreator(item) {
    return {
        type: 'ADD_ITEM',
        item: item
    };
};

store.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }));