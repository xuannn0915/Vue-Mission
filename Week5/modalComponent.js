export default {
  template: `
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{  }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="..." alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{  }}</span>
              <p>商品描述：{{  }}</p>
              <p>商品內容：{{  }}</p>
              <div class="h5">{{  }} 元</div>
              <del class="h6">原價 {{ }} 元</del>
              <div class="h5">現在只要 {{  }} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1">
                  <button type="button" class="btn btn-primary">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
};