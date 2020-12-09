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
          <i
            class="fa fa-file-text-o fa-2x"
            @click="toggleModal"
            aria-hidden="true"
            style="cursor: pointer"
            >{{ order.length }}</i
          >
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
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              加購
            </button>
            <button class="btn btn-primary" @click="changeType">
              <i class="fa fa-eye" aria-hidden="true"></i>
              換商品
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
          <tr v-for="(cart, index) in cartList" :key="index">
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
              min="1"
              :max="maxNumber"
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
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          back to Shop
        </router-link>
      </div>
      <div class="col-md-6 center-block">
        <button
          class="btn btn-success btn-lg btn-block center-block"
          fa-pull-right
          @click="confirmOrder"
        >
          <i class="fa fa-usd" aria-hidden="true"></i>
          buy now
        </button>
      </div>
    </div>
    <modal :show="show" :active="active" @toggleModal="toggleModal" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modal from "../components/modal";

export default {
  components: {
    modal,
  },
  data() {
    return {
      show: false,
      active: false,
      item: {},
      itemNumber: 0,
    };
  },
  computed: {
    ...mapGetters({
      cartTotal: "getShoppingCartTotal",
      cartList: "getShoppingCart",
      total: "getCartPriceTotal",
      recommend: "getRecommendedProducts",
      products: "getProducts",
      order: "getOrder",
      maxNumber: "getMaxNumber",
    }),
  },
  methods: {
    ...mapActions(["cancelCart", "addCart", "confirmOrder", "changeType"]),
    editNumber(cart) {
      this.item = cart;
      this.itemNumber = cart.number;
      this.setMaxNumber();
    },
    cancelEdit() {
      this.item = {};
      this.itemNumber = 0;
    },
    actionEditCart() {
      var item = this.item;
      var itemNumber = this.itemNumber;
      this.$store.dispatch("editCart", { item, itemNumber });
      this.item = {};
      this.itemNumber = 0;
    },
    toggleModal() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
      setTimeout(() => (this.show = !this.show), 10);
    },
    setMaxNumber() {
      const item = this.item;
      this.$store.dispatch("setMaxNumber", item);
      console.log(this.maxNumber);
    },
  },
  watch: {
    itemNumber: function () {
      if (this.itemNumber > this.maxNumber) {
        this.itemNumber = this.maxNumber;
      }
      if (parseInt(this.itemNumber) < 1) {
        this.itemNumber = 1;
      }
    },
  },
};
</script>