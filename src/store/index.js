import Vue from 'vue';
import Vuex from 'vuex';
import todo from './module/todo';
import shop from './module/shop';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        todo,
        shop,
    },
    strict: true
});