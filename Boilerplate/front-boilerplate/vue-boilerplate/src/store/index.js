import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: { // 保存不属于模块的 state
    },
    getters, // 保存不属于模块的 getters
    actions, // 保存不属于模块的 actions
    mutations, // 保存不属于模块的 mutations
    modules: { // 模块 store 存放位置
    },
    strict: debug,
});
