const api_path = "xuan02";
const url = "https://ec-course-api.hexschool.io/v2";

import pagination from "./component/pagination.js";
import modalComponent from "./component/modalComponent.js";
// import productStore from "./store/productStore.js";

const app = Vue.createApp({
  data() {
    return {
      productList: [],
      pagesInfo: {},
      tempProduct:{}
    };
  },
  methods: {
    renderProductList(num) {
      axios
        .get(`${url}/api/${api_path}/products?page=${num}`)
        .then((res) => {
          this.pagesInfo = res.data.pagination;
          this.productList = res.data.products;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    showProductModal(item){
      this.tempProduct = item
      this.$refs.productModal.openModal();
    }
  },
  components: {
    pagination,
    modalComponent,
  },
  mounted() {
    this.renderProductList(1);
  },
});

app.mount("#app");
