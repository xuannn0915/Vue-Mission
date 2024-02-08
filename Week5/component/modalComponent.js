export default {
  data() {
    return {
      modal: null,
    };
  },
  props: ["modalContent"],
  methods: {
    openModal() {
      this.modal.show();
    },
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
                  <input type="number" class="form-control" min="1" value="1">
                  <button type="button" class="btn btn-primary">加入購物車</button>
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
