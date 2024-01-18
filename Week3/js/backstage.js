// 產品資料格式
const url = "https://ec-course-api.hexschool.io/v2";
const api_path = "xuan02";
let myModal = "";

const app = {
  // 資料
  data() {
    return {
      products: [],
      isChosenHint: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },

  // 方法
  methods: {
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
    closeModal() {
      myModal.hide();
    },
    saveNewProduct() {
      const title = document.querySelector("#title").value;
      const category = document.querySelector("#category").value;
      const unit = document.querySelector("#unit").value;
      const origin_price = Number(
        document.querySelector("#origin_price").value
      );
      const price = Number(document.querySelector("#price").value);
      const description = document.querySelector("#description").value;
      const content = document.querySelector("#content").value;
      const is_enabled = Number(document.querySelector("#is_enabled").value);

      this.tempProduct = {
        title,
        category,
        unit,
        origin_price,
        price,
        description,
        content,
        is_enabled,
        imageUrl: "",
        imagesUrl: [],
      };
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

  computed: {},

  watch: {},

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
};

Vue.createApp(app).mount("#app");
