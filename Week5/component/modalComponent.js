export default {
  data() {
    return {
      modal: null,
      qty:1,
    };
  },
  props: ["modalContent", "addToCart","status"],
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal(){
      this.modal.hide();
    }
  },
  watch:{
    modalContent(){
      this.qty=1;
    }
  },
  template: `
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-light text-white">
          <h5 class="modal-title text-dark" id="exampleModalLabel">
            <span>{{modalContent.title}}</span>
          </h5>
          <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="modalContent.imageUrl" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{modalContent.category}}</span>
              <p>商品描述：{{modalContent.description}}</p>
              <p>商品內容：{{modalContent.content}}</p>
              <div class="h5">{{modalContent.price}}元</div>
              <del class="h6">原價{{modalContent.origin_price}} 元</del>
              <div class="h5">現在只要{{modalContent.price}} 元</div>
              <div>
                <div class="input-group">
                  <select class="form-select" aria-label="Default select example" v-model="qty">
                    <option :value="i" v-for="i in 20" :key="i">{{i}}</option>
                  </select>
                  <button type="button" class="btn btn-primary" @click="addToCart(modalContent.id, qty)" :disabled="status === modalContent.id">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="status === modalContent.id"></span>
                  加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
};
