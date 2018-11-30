import { createStore, combineReducers } from 'redux';

let itemsReducer = (state = [], action) => {
    console.log('items Reducer was called with state', state, 'and action', action);
    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ];
        default:
            return state;
    }
}

let reducer = combineReducers({ items: itemsReducer });
let store = createStore(reducer);

store.subscribe(() => {
    console.log( 'store has been updated. Latest store state:', store.getState());
});

let addItemActionCreator = (item) => {
    return {
        type: 'ADD_ITEM',
        item: item
    }
};

store.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }));
