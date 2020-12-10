<template>
  <div id="app">
    <div v-if="loading" class="loader is-active"></div>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link class="nav-link" to="/index">首頁</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/aboutus">關於我們</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/products">產品型錄</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/contactus">聯絡我們</router-link>
      </li>
    </ul>
    <br />
    <router-view />
    <!-- loading 拉到最外層，可以讓所有頁面使用。 -->
    <div v-if="loading" class="spinner-border text-warning" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
export default {
  name: "App",
  computed: mapGetters({
    loading: 'getLoading'
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
.spinner-border{
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  width: 100px;
  height: 100px;
}
.loader{color:#fff;position:fixed;box-sizing:border-box;left:-9999px;top:-9999px;width:0;height:0;overflow:hidden;z-index:99}
.loader:after,.loader:before{box-sizing:border-box}
.loader.is-active{background-color:rgba(0,0,0,0.5);width:100%;height:100%;left:0;top:0}
</style> 
