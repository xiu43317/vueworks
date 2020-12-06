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
  </div>
</template>

<script>
export default {
  name: "App",
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
