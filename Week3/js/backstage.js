// 產品資料格式
const url = "https://ec-course-api.hexschool.io/v2";
const api_path = "xuan02";
let myModal = "";

const app = {
  // 資料
  data() {
    return {
      products: [],
      isNew:false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },

  // 方法
  methods: {
    // 確認使用者權限
    checkUser() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.renderProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "index.html";
        });
    },

    // 渲染列表
    renderProducts() {
      axios
        .get(`${url}/api/${api_path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    saveNewProduct() {
      axios
        .post(`${url}/api/${api_path}/admin/product`, {
          data: this.tempProduct,
        })
        .then((res) => {
          alert(res.data.message);
          this.closeModal();
          this.renderProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },

  // 初始化
  mounted() {
    // token帶入header做驗證
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)xuanToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    // modal初始化才能抓到dom元素
    myModal = new bootstrap.Modal(document.getElementById("modal"));

    // 確認身份
    this.checkUser()
  },

};

Vue.createApp(app).mount("#app");
