import {
    exampleGetSomething,
} from '@/services/fetch';

import {
    EXAMPLE_GET_SOMETHING,
} from '@/store/mutation-types';

const exampleState = {
    someState: '',
};

const mutations = {
    [EXAMPLE_GET_SOMETHING](state, data) {
        state.someState = data.someState;
    },
};

const getters = {
    exampleSomeState: state => state.someState,
};

const actions = {
    exampleGetSomeState({ commit, state }, data) {
        let someParam = state.someState;
        exampleGetSomething(someParam, data)
            .then((d) => {
                commit(EXAMPLE_GET_SOMETHING, d.someState);
            });
    },
};

export default {
    exampleState,
    actions,
    getters,
    mutations,
};
