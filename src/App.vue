<template>
  <div>
    <div id="goToTop" class="go-to-top" @click="scrollToTop" v-if="isScrollTop">
      <i class="fa fa-arrow-circle-up fa-3x" aria-hidden="true"></i>
    </div>
    <div v-if="loading" class="loader is-active"></div>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <!-- Brand -->
      <a class="navbar-brand" href="#/index">首頁</a>

      <!-- Toggler/collapsibe Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div
        class="collapse navbar-collapse"
        id="collapsibleNavbar"
        :class="{ show: show }"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-if="auth">
            <router-link class="nav-link" to="/aboutus">OPEN1999</router-link>
          </li>
          <li class="nav-item" v-if="auth">
            <router-link class="nav-link" to="/products">產品型錄</router-link>
          </li>
          <li class="nav-item" v-if="auth">
            <router-link class="nav-link" to="/contactus">備忘錄</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
    <!-- loading 拉到最外層，可以讓所有頁面使用。 -->
    <div v-if="loading" class="spinner-border text-warning" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      show: false,
      // 定義滾動位置
      scrollTop:null,
      // 定義按鍵出現
      isScrollTop:false,
    };
  },
  mounted(){
    window.addEventListener('scroll',()=>{
      this.scrollTop = document.documentElement.scrollTop
      // 控制按鈕隱藏跟顯示
      if(this.scrollTop > 300){
        this.isScrollTop = true;
      }else{
        this.isScrollTop = false;
      }
    },true)
  },
  methods: {
    toggleNavbar() {
      this.show = !this.show;
    },
    scrollToTop(){
      setTimeout(()=>{
        if(document.documentElement.scrollTop>0){
          document.documentElement.scrollTop-=30;
          this.scrollToTop();
        }
      },1);
    },
  },
  computed: mapGetters({
    loading: "getLoading",
    auth: "getLogin",
  }),
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.spinner-border {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
  z-index: 100;
  width: 100px;
  height: 100px;
}
.loader {
  color: #fff;
  position: fixed;
  box-sizing: border-box;
  left: -9999px;
  top: -9999px;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: 99;
}
.loader:after,
.loader:before {
  box-sizing: border-box;
}
.loader.is-active {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.go-to-top {
  cursor: pointer;

  position: fixed;
  bottom: 5rem;
  right: 1.4rem;
  z-index: 999;
}
</style> 
