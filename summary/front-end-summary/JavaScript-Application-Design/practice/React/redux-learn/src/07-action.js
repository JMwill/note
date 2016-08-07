import { createStore, combineReducers, applyMiddleware } from 'redux';

let reducer = combineReducers({
    spaker: (state = {}, action) => {
        console.log('speaker was called with state', state, 'and action', action);
        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                };
            default:
                return state;
        }
    }
});

let store0 = createStore(reducer);
let sayActionCreator = (message) => {
    return {
        type: 'SAY',
        message
    }
};

/*
 *console.log('\n', 'Running our normal action creator', '\n');
 *console.log(new Date());
 *store0.dispatch(sayActionCreator('Hi'));
 *
 *console.log(new Date());
 *console.log('store 0 state after action SAY:', store0.getState());
 */

let asyncSayActionCreator = (message) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'SAY',
                message
            });
        }, 2000);
    }
}

/*
 *console.log('\n', 'Running our async action creator', '\n');
 *console.log(new Date());
 *asyncSayActionCreator('Hello')(store0.dispatch);
 *
 *console.log(new Date());
 *console.log('store 0 state after action SAY:', store0.getState());
 */

let thunkMiddleware = ({ dispatch, getState }) => {
    return (next) => {
        return (action) => {
            return typeof action === 'function' ?
                    action(dispatch, getState) :
                    next(action)
        }
    }
}

let logMiddleware = ({ dispatch, getState }) => {
    return (next) => {
        return (action) => {
            console.log('logMiddleware action recerived: ', action);
            next(action);
        }
    }
}

const finalCreateStore = applyMiddleware(thunkMiddleware, logMiddleware)(createStore);

const store1 = finalCreateStore(reducer);
console.log('\n', 'Running our normal action creator', '\n');
console.log(new Date());
store1.dispatch(asyncSayActionCreator('Hi'));

console.log(new Date());
console.log('store 0 state after action SAY:', store0.getState());
