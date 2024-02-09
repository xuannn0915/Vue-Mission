const api_path = "xuan02";
const url = "https://ec-course-api.hexschool.io/v2";

import pagination from "./component/pagination.js";
import modalComponent from "./component/modalComponent.js";

const app = Vue.createApp({
  data() {
    return {
      productList: [],
      cartList: [],
      pagesInfo: {},
      tempProduct: {},
      cartTotal: 0,
      status: {
        addCartLoading: "",
      },
      userInfo: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
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
    showProductModal(item) {
      this.tempProduct = item;
      this.$refs.productModal.openModal();
    },
    addProduct(product_id, qty = 1) {
      const item = {
        product_id,
        qty,
      };
      this.status.addCartLoading = product_id;
      axios
        .post(`${url}/api/${api_path}/cart`, { data: item })
        .then((res) => {
          this.status.addCartLoading = "";
          alert(res.data.message);
          this.renderCartList();
          this.$refs.productModal.closeModal();
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    renderCartList() {
      axios
        .get(`${url}/api/${api_path}/cart`)
        .then((res) => {
          this.cartList = res.data.data.carts;
          this.cartTotal = res.data.data.final_total;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    changeCartNum(product, qty = 1) {
      const item = {
        product_id: product.product_id,
        qty,
      };
      axios
        .put(`${url}/api/${api_path}/cart/${product.id}`, {
          data: item,
        })
        .then((res) => {
          alert(res.data.message);
          this.renderCartList();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteAll() {
      axios
        .delete(`${url}/api/${api_path}/carts`)
        .then((res) => {
          alert(res.data.message);
          this.renderCartList();
        })
        .catch((err) => {
          console.log(err.response.message);
        });
    },
    deleteProduct(id) {
      axios.delete(`${url}/api/${api_path}/cart/${id}`).then((res) => {
        alert(res.data.message);
        this.renderCartList();
      });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    sendForm() {
      axios
        .post(`${url}/api/${api_path}/order`, { data: this.userInfo })
        .then((res) => {
          alert(res.data.message);
          this.cartList=[];
          this.cartTotal= 0;
          this.userInfo= {
            user: {
              name: "",
              email: "",
              tel: "",
              address: "",
            },
            message: "",
          };
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  components: {
    pagination,
    modalComponent,
  },
  mounted() {
    this.renderProductList(1);
    this.renderCartList();
  },
});

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
