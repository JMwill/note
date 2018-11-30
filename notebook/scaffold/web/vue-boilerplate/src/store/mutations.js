import {
    GET_SOMETHING,
    POST_SOMETHING,
} from '@/store/mutation-types';

export default {
    [GET_SOMETHING](state, someData) {
        if (someData.hasFirst) {
            state.hasFirst = someData.hasFirst;
        }
    },
    [POST_SOMETHING](state, someData) {
        if (someData.isAuth) {
            state.auth = someData.isAuth;
        }
    },
};
