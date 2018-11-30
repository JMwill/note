'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var reducer = (0, _redux.combineReducers)({
    spaker: function spaker() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var action = arguments[1];

        console.log('speaker was called with state', state, 'and action', action);
        switch (action.type) {
            case 'SAY':
                return _extends({}, state, {
                    message: action.message
                });
            default:
                return state;
        }
    }
});

var store0 = (0, _redux.createStore)(reducer);
var sayActionCreator = function sayActionCreator(message) {
    return {
        type: 'SAY',
        message: message
    };
};

/*
 *console.log('\n', 'Running our normal action creator', '\n');
 *console.log(new Date());
 *store0.dispatch(sayActionCreator('Hi'));
 *
 *console.log(new Date());
 *console.log('store 0 state after action SAY:', store0.getState());
 */

var asyncSayActionCreator = function asyncSayActionCreator(message) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch({
                type: 'SAY',
                message: message
            });
        }, 2000);
    };
};

/*
 *console.log('\n', 'Running our async action creator', '\n');
 *console.log(new Date());
 *asyncSayActionCreator('Hello')(store0.dispatch);
 *
 *console.log(new Date());
 *console.log('store 0 state after action SAY:', store0.getState());
 */

var thunkMiddleware = function thunkMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;

    return function (next) {
        return function (action) {
            return typeof action === 'function' ? action(dispatch, getState) : next(action);
        };
    };
};

var logMiddleware = function logMiddleware(_ref2) {
    var dispatch = _ref2.dispatch;
    var getState = _ref2.getState;

    return function (next) {
        return function (action) {
            console.log('logMiddleware action recerived: ', action);
            next(action);
        };
    };
};

var finalCreateStore = (0, _redux.applyMiddleware)(thunkMiddleware, logMiddleware)(_redux.createStore);

var store1 = finalCreateStore(reducer);
console.log('\n', 'Running our normal action creator', '\n');
console.log(new Date());
store1.dispatch(asyncSayActionCreator('Hi'));

console.log(new Date());
console.log('store 0 state after action SAY:', store0.getState());