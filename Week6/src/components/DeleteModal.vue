<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="deleteModal"
    data-bs-backdrop="static"
    ref="deleteModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white fw-bold h5">
          <h5 class="modal-title">刪除產品</h5>
        </div>
        <div class="modal-body">
          <p>
            是否刪除
            <strong class="text-danger"> {{ delTitle }} </strong>
            商品(刪除後將無法恢復)。
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delItem">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: ['delProduct'],
  data() {
    return {
      deleteModal: null,
      delTitle: '',
      delId: '',
    };
  },
  methods: {
    openModal() {
      this.deleteModal.show();
    },
    closeModal() {
      this.deleteModal.hide();
    },
    delItem() {
      this.$emit('del', this.delId);
    },
  },
  watch: {
    delProduct() {
      this.delId = this.delProduct.id;
      this.delTitle = this.delProduct.product.title;
    },
  },
  mounted() {
    this.deleteModal = new Modal(this.$refs.deleteModal);
  },
};
</script>
