<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <!-- Brand -->
      <a class="navbar-brand" href="#">ShoppingCart</a>
      <form class="form-inline">
        <div class="mr-sm-2">
          <i class="fa fa-shopping-cart w3-margin-right fa-2x">{{
            cartTotal
          }}</i>
          <i class="fa fa-file-text-o fa-2x" aria-hidden="true"></i>
        </div>
      </form>
    </nav>
    <!-- Recommended Products -->
    <div class="recommend">
      <div class="row">
        <div class="col-md-3">
          <img :src="recommend.image" style="width: 100%" />
        </div>
        <div class="col-md-9">
          <div class="recommend-info">
            <h2>{{ recommend.title }}</h2>
            <hr />
            <h3>
              Just some random text, lorem ipsum text praesent tincidunt ipsum
              lipsum. Just some random text, Once again, some random text to
              lorem lorem lorem lorem ipsum text praesent tincidunt ipsum
              lipsum.
            </h3>
            <h2>${{ recommend.price }}</h2>
            <button class="btn btn-danger" @click="addCart(recommend.title)">
              <span
                class="glyphicon glyphicon-shopping-cart"
                aria-hidden="true"
              ></span>
              加購
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading panel-price">
        總計： <span>${{ total.toFixed(2) }}</span> 元
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>項目</th>
            <th>價錢</th>
            <th>樣式</th>
            <th>數量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart, index) in cartList">
            <td>{{ index + 1 }}</td>
            <td>{{ cart.price }}</td>
            <td>{{ cart.title }}</td>
            <td @dblclick="editNumber(cart)" v-if="cart.title !== item.title">
              <span>{{ cart.number }}</span>
              <button
                type="button"
                class="close ml-auto"
                aria-label="Close"
                @click="cancelCart(cart.title)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </td>
            <input
              class="form-control"
              v-model="itemNumber"
              type="number"
              v-if="cart.title === item.title"
              style="text-align: center"
              @keyup.esc="cancelEdit"
              @keyup.enter="actionEditCart"
              @blur="cancelEdit"
              min="1" max="10"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-md-6 center-block">
        <router-link
          :to="{ name: 'products' }"
          class="btn btn-warning btn-lg btn-block"
        >
          <span
            class="glyphicon glyphicon-arrow-left"
            aria-hidden="true"
          ></span>
          back to Shop
        </router-link>
      </div>
      <div class="col-md-6 center-block">
        <button class="btn btn-success btn-lg btn-block center-block">
          <span class="glyphicon glyphicon-usd" aria-hidden="true"></span>
          buy now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      item: {},
      itemNumber:0,
    };
  },
  computed: mapGetters({
    cartTotal: "getShoppingCartTotal",
    cartList: "getShoppingCart",
    total: "getCartPriceTotal",
    recommend: "getRecommendedProducts",
  }),
  methods: {
    ...mapActions(["cancelCart", "addCart"]),
    editNumber(cart) {
      this.item = cart;
      this.itemNumber = cart.number;
    },
    cancelEdit() {
      this.item = {};
      this.itemNumber = 0;
    },
    actionEditCart() {
      this.item.number = this.itemNumber;
      this.$store.dispatch('editCart',this.item);
      this.item={};
      this.itemNumber=0;
    }
  },
};
</script>