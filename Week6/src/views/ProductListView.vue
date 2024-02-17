<template>
  <div class="p-4">
    <h2>
        這是產品列表頁</h2>
    <LoadingComponent :active="isLoading" />
    <!-- 商品列表 -->
    <table class="table align-middle">
        <thead>
            <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in productList" :key="product.id">
                <td style="inline-size: 200px">
                    <div style="
                      block-size:100px ;
                      background-size: cover;
                      background-position: center;"
                      :style="{backgroundImage:`url(${product.imageUrl})`}">
                    </div>
                </td>
                <td>{{product.title}}</td>
                <td>
                    <div class="h5" v-if="product.origin_price===product.price">
                        {{ product.price}} 元
                    </div>
                    <div>
                        <del class="h6 text-secondary">原價 {{product.origin_price}} 元</del>
                        <div class="h5">
                            現在只要
                            <span class="text-danger">
                          {{ product.price}}
                          </span> 元
                        </div>
                    </div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                      <button type="button"
                      class="btn btn-outline-secondary" @click="showProductModal(product)">
                        <i class="fas fa-spinner fa-pulse"></i>
                        查看更多
                      </button>
                      <button type="button"
                      class="btn btn-outline-danger"
                      @click="addProduct(product.id)"
                      :disabled=" status.addCartLoading === product.id">
                        <span
                        class="spinner-border spinner-border-sm"
                        role="status" aria-hidden="true"
                        v-if="status.addCartLoading === product.id"></span>
                        加到購物車
                      </button>
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- <pagination :pages="pagesInfo" @choose-page="renderProductList"></pagination> -->
  </div>

  <productModal :modal-content="tempProduct"></productModal>
</template>

<script>
// import productModal from '../components/ProductModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: true,
      productList: [],
      tempProduct: {},
      status: {
        addCartLoading: true,
      },
    };
  },
  methods: {
    showProductModal(item) {
      this.tempProduct = item;
    },
    addProduct() {
      console.log(456);
    },
  },
  components: {
    // productModal,
  },
  mounted() {
    this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/products`)
      .then((res) => {
        this.productList = res.data.products;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>
