// 02
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
import { createStore, combineReducers } from 'redux';

let userReducer = (state = {}, action) => {
    console.log('user Reducer was called with state', state, 'and action', action);
    switch (action.type) {
        case 'SET_NAME': 
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
};

let itemsReducer = (state = [], action) => {
    console.log('itemsReducer was called with state', state, 'and action', action);
    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
};

let reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
});

let store0 = createStore(reducer);

console.log('\n', '### It starts here');
console.log('store 0 state after initialization:', store0.getState());

//store0.dispatch({
    //type: 'AN_ACTION'
//});
//console.log('store 0 state after initialization:', store0.getState());

let setNameActionCreator = (name) => {
    return {
        type: 'SET_NAME',
        name: name
    }
};

store0.dispatch(setNameActionCreator('bob'));
console.log('sotre 0 state after action SET_NAME: ', store0.getState());
