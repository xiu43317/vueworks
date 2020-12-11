import Vue from 'vue'

const types = {
  ADD_CART: 'store/ADD_CART',
  CANCEL_CART: 'store/CANCEL_CART',
  EDIT_CART: 'store/EDIT_CART',
  CONFIRM_ORDER: 'store/CONFIRM_OEDER',
  SET_MAXNUMBER: 'store/SET_MAXNUMBER',
  CHANGE_TYPE: 'store/CHANGE_TYPE',
}

const state = {
  // 賣完了的圖示
  soldout: {
    title: 'Sorry, We are sold out',
    image: 'https://qshopdotblog.files.wordpress.com/2018/03/sold-out-jpeg.jpg?w=1101&h=737&crop=1',
    price: 0,
  },
  // 衣服列表
  products: [
    {
      title: 'Ripped Skinny',
      image: 'https://www.w3schools.com/w3images/jeans1.jpg',
      inventory: 10,
      price: 24.99
    },
    {
      title: 'Mega Ripped',
      image: 'https://www.w3schools.com/w3images/jeans2.jpg',
      inventory: 10,
      price: 19.99
    },
    {
      title: 'Washed Skinny',
      image: 'https://www.w3schools.com/w3images/jeans3.jpg',
      inventory: 10,
      price: 20.50
    },
    {
      title: 'Vintage Skinny',
      image: 'https://www.w3schools.com/w3images/jeans4.jpg',
      inventory: 10,
      price: 14.99
    }
  ],
  // 購物車
  shoppingCart: [],
  // 採買清單
  order: [],
  // 最大值
  maxNumber: 0,
  // 隨機取值
  randomNumber: 0,
  // 頁數
  page: 0,
}

const getters = {
  // 取得衣服列表
  getProducts: state => state.products,
  // 取得購物車總數量
  getShoppingCartTotal: state => state.shoppingCart.length,
  // 取得購物車列表
  getShoppingCart: state => state.shoppingCart,
  // 取得購物車衣服總價錢
  getCartPriceTotal: state => state.shoppingCart.reduce((a, b) => a + b.price * b.number, 0),
  // 取得推薦清單
  getRecommendedProducts: state => {
    // 先取得庫存衣服列表
    const inventoryList = state.products.filter(p => p.inventory > 0);
    // 取隨機數
    // const random = Math.round(Math.random() * (inventoryList.length - 1));
    // 不重複頁面
    var page = state.page%inventoryList.length;
    // 回傳隨機數的衣服
    if (inventoryList.length > 0) {
      return inventoryList[page];
    }
    else {
      return state.soldout;
    }

  },
  // 得到最大值
  getMaxNumber: state => {
    return state.maxNumber;
  },
  // 訂單確認狀況
  getOrder: state => {
    return state.order;
  }
}

const actions = {
  addCart({ commit }, id) {
    commit(types.ADD_CART, id);
  },
  cancelCart({ commit }, id) {
    commit(types.CANCEL_CART, id);
  },
  editCart({ commit }, obj) {
    commit(types.EDIT_CART, obj);
  },
  confirmOrder({ commit }) {
    commit(types.CONFIRM_ORDER);
  },
  setMaxNumber({ commit }, obj) {
    commit(types.SET_MAXNUMBER, obj);
  },
  changeType({ commit }) {
    commit(types.CHANGE_TYPE);
  }
}

const mutations = {
  [types.ADD_CART](state, id) {
    // ES6 array find 找到條件成立的內容。
    const product = state.products.find(item => item.title === id && item.inventory !== 0);
    // 衣服庫存 -1
    product.inventory = product.inventory - 1;
    // 衣服加入購物車 title, price 
    if (!state.shoppingCart.filter(item => item.title == id)[0]) {
      state.shoppingCart.push({
        number: 1,
        title: product.title,
        price: product.price,
      });
    } else {
      state.shoppingCart.filter(item => item.title == id)[0].number++
    }
  },
  [types.CANCEL_CART](state, title) {
    // 從購物車移除
    // ES6 array findIndex 找到條件成立的物件，所在陣列中的位子。
    const cartIndex = state.shoppingCart.findIndex(item => item.title === title);
    const backInventory = state.shoppingCart[cartIndex].number;
    state.shoppingCart.splice(cartIndex, 1);
    // 庫存加回去
    const product = state.products.find(item => item.title === title);
    product.inventory += backInventory;
  },
  [types.EDIT_CART](state, obj) {
    const product = state.products.find(item => item.title === obj.item.title);
    product.inventory += parseInt(state.shoppingCart.find(item => item.title === obj.item.title).number);
    //console.log(product.inventory);
    product.inventory -= parseInt(obj.itemNumber);
    //console.log(product.inventory);
    state.shoppingCart.find(item => item.title === obj.item.title).number = parseInt(obj.itemNumber);
  },
  [types.CONFIRM_ORDER](state) {
    const totalprice = state.shoppingCart.reduce((a, b) => a + b.price * b.number, 0);
    if(totalprice !== 0){
    Vue.swal({
      icon:'warning',
      title: '確定購買嗎',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '放棄',
      showCloseButton: true,
      showLoaderOnConfirm: true
    }).then((result) => {
      if(result.value) {
        Vue.swal('購買成功', '感謝你的購買', 'success');
        state.order.push({ childList: state.shoppingCart, total: totalprice.toFixed(2) });
        state.shoppingCart = [];
      } else {
        Vue.swal('取消購買', '再多考慮一下吧', 'info')
      }
    });
    }else {
      Vue.swal({
        icon:'error',
        title:'出錯囉',
        text:'購物車不得為空',
        confirmButtonText: '確認',
      });
    }
  },
  [types.SET_MAXNUMBER](state, obj) {
    const inventory = state.products.find(item => item.title === obj.title).inventory;
    const cartNumber = state.shoppingCart.find(item => item.title === obj.title).number;
    state.maxNumber = inventory + cartNumber;
  },
  [types.CHANGE_TYPE](state) {
    state.page ++;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
