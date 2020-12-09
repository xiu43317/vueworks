<template>
  <div>
    <div
      class="modal fade"
      :class="{ show, 'd-block': active }"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">訂單狀況</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <tbody v-for="(parent, index) in order" :key="index">
                <tr>
                  <td
                    colspan="4"
                    @click="showOrder(index)"
                    style="cursor: pointer"
                  >
                    訂單{{ index + 1 }}，總價：{{ parent.total }}
                  </td>
                </tr>
                <tr :name="index" style="display: none">
                  <th>樣式</th>
                  <th>價錢</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
                <tr
                  :name="index"
                  v-for="(child, cindex) in parent.childList"
                  style="display: none"
                  :key="cindex"
                >
                  <td>{{ child.title }}</td>
                  <td>{{ child.price }}</td>
                  <td>{{ child.number }}</td>
                  <td>{{ (child.price * child.number).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="toggleModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    show: Boolean,
    active: Boolean,
  },
  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
    showOrder(id) {
      var content = document.getElementsByName(id);
      const show = content[0].style.display;
      if (show == "none") {
        for (var i = 0; i < content.length; i++) {
          content[i].style.display = "";
        }
      } else {
        for (var i = 0; i < content.length; i++) {
          content[i].style.display = "none";
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      cartList: "getShoppingCart",
    }),
  },
};
</script>