// 02
//import { createStore } from 'redux';
//var store = createStore(() => {});

// 03
//var reducer = (...args) => {
    //console.log('Reducer was called with args', args);
//};

//var store1 = createStore(reducer);


// 04 
import { createStore } from 'redux';
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

var reducer2 = (state = {}, action) => {
    console.log('reducer 2 was called with state', state, 'and action', action);

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state
    }
};

var store2 = createStore(reducer2);
console.log('store 2 state after initialization: ', store2.getState());
