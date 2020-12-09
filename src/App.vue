<template>
  <div id="app">
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
    <div v-if="loading" class="spinner-border text-success" style="width: 50px; height: 50px;" role="status">
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
</style> 
