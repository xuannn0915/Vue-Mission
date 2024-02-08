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
      tempProduct:{},
      cartTotal:0,
      status:{
        addCartLoading:''
      }
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
    addProduct(product_id, qty=1){
      const item = {
          product_id,
          qty
      }
      this.status.addCartLoading = product_id
      axios.post(`${url}/api/${api_path}/cart`,{data:item})
      .then(res=>{
        this.status.addCartLoading = '';
        alert(res.data.message);
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
        this.cartTotal = res.data.data.final_total
      })
      .catch(err=>{
        console.log(err.response);
      })
    },
    deleteAll(){
      axios.delete(`${url}/api/${api_path}/carts`)
      .then(res=>{
        alert(res.data.message)
        this.renderCartList()
      })
      .catch(err=>{
        console.log(err.response.message);
      })
    },
    deleteProduct(id){
      axios.delete(`${url}/api/${api_path}/cart/${id}`)
      .then(res=>{
        alert(res.data.message);
        this.renderCartList();
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
