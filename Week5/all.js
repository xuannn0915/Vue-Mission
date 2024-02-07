const api_path = "xuan02";
const url = "https://ec-course-api.hexschool.io/v2";

import pagination from "./component/pagination.js";
import modalComponent from "./component/modalComponent.js";
// import productStore from "./store/productStore.js";

const app = Vue.createApp({
  data() {
    return {
      productList: [],
      cartList:[],
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
    },
    addProduct(product_id, qty){
      const item = {
        "data": {
          product_id,
          qty
        }
      }
      axios.post(`${url}/api/${api_path}/cart`,item)
      .then(res=>{
        alert(res.data.message)
        this.renderCartList();
      })
      .catch(err=>{
        console.log(err.response.data.message);
      })
    },
    renderCartList(){
      axios.get(`${url}/api/${api_path}/cart`)
      .then(res=>{
        this.cartList = res.data.data.carts
      })
      .catch(err=>{
        console.log(err.response);
      })
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
