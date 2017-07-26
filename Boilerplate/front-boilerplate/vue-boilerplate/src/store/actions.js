import {
    GET_SOMETHING,
    POST_SOMETHING,
} from '@/store/mutation-types';

import {
    getSomething,
    postSomething,
} from '@/services/fetch';

export default {
    async getSomeDate({
        commit,
        state,
    }) {
        let res = await getSomething();
        if (state.someState) {
            commit(GET_SOMETHING, res.data);
        }
        commit(POST_SOMETHING, res.data);
    },
    async postSomething({
        commit,
    }) {
        let res = postSomething({ params: {
            firstParam: 'first',
            secondParam: 'second',
        } });
        commit(POST_SOMETHING, res.data);
    },
};
