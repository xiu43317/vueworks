<template>
  <div>
    <!-- Top header -->
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Jeans</p>
      <p class="w3-right">
        <router-link :to="{name:'cart'}"><i class="fa fa-shopping-cart w3-margin-right fa-1x">{{cartTotal}}</i></router-link>
        <i class="fa fa-file-text-o" aria-hidden="true"></i>
      </p>
    </header>
      <!-- Image header -->
  <div class="w3-display-container w3-container">
    <img src="https://www.w3schools.com/w3images/jeans.jpg" alt="Jeans" style="width:100%">
    <div class="w3-display-topleft w3-text-white" style="padding:24px 48px">
      <h1 class="w3-jumbo w3-hide-small">New arrivals</h1>
      <h1 class="w3-hide-large w3-hide-medium">New arrivals</h1>
      <h1 class="w3-hide-small">COLLECTION 2016</h1>
      <p><a href="#jeans" class="w3-button w3-black w3-padding-large w3-large">SHOP NOW</a></p>
    </div>
  </div>
    <!-- PAGE CONTENT -->
    <div
      id="jeans"
      class="w3-main w3-content w3-padding"
      style="max-width: 1200px; margin-top: 100px"
    >
      <div class="w3-row-padding w3-padding-16 w3-center" id="cloth">
        <!-- 
        產品列表
        當產品庫存為: 0 
        使用 :class 加上 "w3-grayscale-max" class
        -->
        <div
          v-for="(item, index) in clothList"
          class="w3-quarter"
          :class="{ 'w3-grayscale-max': !item.inventory }"
        >
          <img :src="item.image" style="width: 100%" />
          <h3>{{ item.title }}</h3>
          <h4>{{ item.price }}</h4>
          <!-- 
          數據驅動 UI
          根據條件變化不同 class
          當庫存為:0 的時候 ":disabled"
        -->
          <button
            class="w3-btn w3-round-large w3-large w3-padding-large"
            :class="{
              'w3-red': item.inventory == 1,
              'w3-green': item.inventory >= 2,
              'w3-dark-grey': !item.inventory,
            }"
            :disabled="!item.inventory"
            @click="addCart(item.title)"
          >
            <span
              class="glyphicon glyphicon-shopping-cart"
              aria-hidden="true"
            ></span>
            <!-- 
            數據驅動 UI
            按鈕顯示文案
            -->
            <span v-if="item.inventory == 1">最後 {{ item.inventory }} 件</span>
            <span v-if="item.inventory >= 2">限量 {{ item.inventory }} 件</span>
            <span v-if="!item.inventory">Sold out</span>
          </button>
        </div>
        <!-- end product -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed:{
        ...mapGetters({
            clothList: 'getProducts',
            cartTotal: 'getShoppingCartTotal',
        })
    },
    methods: {
        ...mapActions([
            'addCart',
        ])
    },
}
</script>
<style src="../../static/css/w3.css"></style>