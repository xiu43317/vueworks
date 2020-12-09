import Vue from 'vue';
import Vuex from 'vuex';
import todo from './module/todo';
import shop from './module/shop';
import opendata from './module/opendata';
import { state, actions, mutations, getters } from './root';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules:{
        todo,
        shop,
        opendata,
    },
    strict: true
});