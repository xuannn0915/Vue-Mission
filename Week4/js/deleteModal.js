export default{
  props:['tempProduct','delProduct'],
  data() {
    return {
      deleteModal: null,
    }
  },
  methods:{
    openModal(){
      this.deleteModal.show()
    },
    closeModal(){
      this.deleteModal.hide()
    }
  },
  template:`
  <div class="modal fade" tabindex="-1" id="deleteModal"
  data-bs-backdrop="static" ref="deleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white fw-bold h5">
          <h5 class="modal-title ">刪除產品</h5>
        </div>
        <div class="modal-body">
          <p>是否刪除 
            <strong class="text-danger">{{ tempProduct.title }}</strong>
          商品(刪除後將無法恢復)。
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
  `,
  mounted(){
    this.deleteModal = new bootstrap.Modal(this.$refs.deleteModal);
  }
}