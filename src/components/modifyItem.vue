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
            <h5 class="modal-title" id="exampleModalLongTitle">修改數量</h5>
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
          <div class="modal-body" style="text-align: center">
            <button
              type="button"
              class="btn btn-primary btn-circle mr-auto"
              style="border-radius: 30px"
              @click="substract"
            >
              <i class="fa fa-minus"></i>
            </button>
            &nbsp;
            <span class="mr-auto">{{ number }}</span>
            &nbsp;
            <button
              type="button"
              class="btn btn-primary btn-circle mr-auto"
              style="border-radius: 30px"
              @click="add"
            >
              <i class="fa fa-plus"></i>
            </button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="toggleModal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="editCart">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>
  </div>
</template>
<script>
export default {
  props: {
    number: Number,
    show: Boolean,
    active: Boolean,
  },
  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
    add() {
      this.$emit("add");
    },
    substract() {
      this.$emit("substract");
    },
    editCart() {
        this.$emit("editCart");
    },
  },
};
</script>