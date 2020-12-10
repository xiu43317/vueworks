<template>
  <div id="app">
    <div v-if="loading" class="loader is-active"></div>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
      <!-- Brand -->
      <router-link class="nav-link" to="/index">首頁</router-link>

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
      <div class="collapse navbar-collapse" id="collapsibleNavbar" :class="{'show':show}">
        <ul class="navbar-nav">
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
    };
  },
  methods: {
    toggleNavbar() {
      this.show = !this.show;
    },
  },
  computed: mapGetters({
    loading: "getLoading",
    auth: 'getLogin',
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
</style> 
