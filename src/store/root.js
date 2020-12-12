import * as types from './mutations_types.js';

export const state = {
    loading: false,
    login: false,
    token: '',
    lang: 'en',
}

export const getters = {
    getLoading: state => state.loading,
    getLogin: state => state.login,
    getLanguage: state => state.lang,
}

export const actions = {
    toggleLoading({ commit }, isLoading) {
        commit(types.LOADING, isLoading);
    },
    setLanguage({commit},lang) {
        commit(types.LANGUAGE,lang);
    },
    // login
    actionLogin({ commit }, { email, password }) {
        //console.log('1. actionLogin');
        commit(types.LOADING, true); // 打開遮罩
        // 使用 Promise 包裝 API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'abc@helloVue.com' && password === '1234') {
                    //console.log('2. Promise resolve');
                    commit(types.TOKEN, '3345678'); // success 儲存 token
                    commit(types.LOADING, false); // 關閉遮罩
                    resolve(); // resolve 結果會在 then 裡面收到
                }
                // error
                else {
                    commit(types.LOADING, false); // 關閉遮罩
                    reject(); // reject 結果會在 catch 裡面收到
                }
            }, 1500);
        });
    },
    actionLogout({ commit }) {
        commit(types.TOKEN, '')
    }
}

export const mutations = {
    [types.LOADING](state, isLoading) {
        state.loading = isLoading;
    },
    [types.TOKEN](state, token) {
        state.token = token;
        if (token !== '') {
            state.login = true;
        } else {
            state.login = false;
        }
    },
    [types.LANGUAGE](state,lang){
        state.lang = lang;
    }
}