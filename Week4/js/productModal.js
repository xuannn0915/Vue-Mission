export default{
  props:['tempProduct', 'saveProduct'],
  data(){
    return{
      productModal:null,
    }
  },
  methods:{
    openModal(){
      this.productModal.show()
    },
    closeModal(){
      this.productModal.hide()
    }
  },
  template:`      
  <div
  class="modal fade"
  tabindex="-1"
  id="addModal"
  data-bs-backdrop="static"
  ref="productModal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white h4 fw-bold" v-if="isNew">新增產品</h5>
          <h5 class="modal-title text-white h4 fw-bold" v-else>編輯產品</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageUrl"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
                <img :src="tempProduct.imageUrl"/>
              </div>
              <div class="h5 fw-bold mb-3">多圖新增</div>
              <!-- 當新增modal時若「未新增更多圖片」imagesUrl為空陣列時，post後的imagesUrl為undefined，因此下方新增欄位則不顯示 -->
              <div v-if="tempProduct.imagesUrl">
                <div class="mb-3" v-for="(pic, key) in tempProduct.imagesUrl" :key="pic">
                  <label :for="key" class="form-label">圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    :id="key"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imagesUrl[key]"
                  />
                  <img :src="pic"/>
                </div>
                <!-- 
                  判斷條件：當「無更多相片」或「最後一個內容有值」出現新增按鈕
                  1.無更多相片： 當imagesUrl的長度為0時為false，因此前方使用！反轉為true。 
                  2.最後一個內容有值：用陣列長-1取出最後一個內容，當為空值時為false，有內容時為真值故為true。
                -->
                <button class="btn btn-outline-primary w-100" type="button" @click="tempProduct.imagesUrl.push('')" v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length-1] ">
                  新增圖片
                </button>
                <button class="btn btn-outline-danger w-100" type="button" v-else @click="tempProduct.imagesUrl.pop()">
                  刪除圖片
                </button>
              </div>
              <!-- 當新增modal時若「未新增更多圖片」imagesUrl為空陣列時，post後的imagesUrl不存在，因此顯示下方新增按鈕 -->
              <button class="btn btn-outline-primary w-100" type="button" @click="createImages" v-else>
                新增圖片
              </button>
            </div>
            <div class="col-md-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title" 
                />
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label for="category" class="form-label">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="unit" class="form-label">單位</label>
                    <input
                      type="text"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model.number="tempProduct.origin_price"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="price" class="form-label">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model.number="tempProduct.price"
                    />
                  </div>
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea class="form-control" id="description" rows="2" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea class="form-control" id="content" rows="2" placeholder="請輸入說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input  align-middle" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled"  :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled" class="align-top">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="saveProduct(tempProduct.id)">確認</button>
        </div>
      </div>
    </div>
  </div>
  `,
mounted(){
  this.productModal = new bootstrap.Modal(this.$refs.productModal);
}
}