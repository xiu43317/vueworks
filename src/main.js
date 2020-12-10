// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "./directive/custom-directive"
import en from './i18n/en.json'; // 存放英文翻譯
import tw from './i18n/tw.json'; // 存放繁體中文翻譯

Vue.config.productionTip = false

// 初始化vuei18n
Vue.use(VueI18n);
// 初始化sweetalert
Vue.use(VueSweetalert2);

// 目前的語系寫法先產生一個物件，類似store的做法
const i18n = new VueI18n({
  locale: Vue.config.lang,
  messages: {
    en,
    tw,
  },
});
/* eslint-disable no-new */
// 頁面轉跳驗證
router.beforeEach((to, from, next) => {
  // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
  //console.log('to=', to.fullPath, '| from=', from.fullPath);
  if (to.matched.some(record => {
    //console.log(record.name, record.meta.requiresAuth);
    return record.meta.requiresAuth;
  })) {
    // 如果沒有 token 
    //console.log('token?', store.state.token);
    if (store.state.token === '') {
      // 轉跳到 login page
      next({ path: '/index' });
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }
});
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
