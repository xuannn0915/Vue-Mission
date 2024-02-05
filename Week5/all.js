const api_path = "xuan02";
const url = "https://ec-course-api.hexschool.io/v2";

import pagination from "./pagination.js";

const app = Vue.createApp({
  data() {
    return {
      productList:[],
    };
  },
  methods: {
    checkUser() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.renderProductList();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "index.html";
        });
    },
    renderProductList() {
      axios
        .get(`${url}/api/${api_path}/admin/products`)
        .then((res) => {
          console.log(res.data);
          this.productList = res.data.products
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  components:{
    pagination,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)xuanToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkUser();
  },
});

app.mount("#app");
