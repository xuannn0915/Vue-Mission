// 產品資料格式
const url = "https://ec-course-api.hexschool.io/v2";
const api_path = "xuan02";

const app = {
  // 資料
  data() {
    return {
      products: [],
      isChosenHint: true,
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
    addProductModal() {
      const addProduct = document.querySelector("#addProduct");
      const addProductModal = new bootstrap.Modal(addProduct);
      addProductModal.show();
    },
    closeProductModal() {
      const addProduct = document.querySelector("#addProduct");
      const addProductModal = new bootstrap.Modal(addProduct);
      addProductModal.hide();
    },
    saveNewProduct() {
      const title = document.querySelector("#title").value;
      const category = document.querySelector("#category").value;
      const unit = document.querySelector("#unit").value;
      const origin_price = Number(document.querySelector("#origin_price").value);
      const price = Number(document.querySelector("#price").value);
      const description = document.querySelector("#description").value;
      const content = document.querySelector("#content").value;
      const is_enabled = Number(document.querySelector("#is_enabled").value);

      // if (
      //   title == "" ||
      //   category == "" ||
      //   unit == "" ||
      //   (origin_price == "") | (price == "")
      // ) {
      //   alert("所有欄位為必填，請完整輸入內容！");
      //   return;
      // }
      this.tempProduct = {
        title,
        category,
        unit,
        origin_price,
        price,
        description,
        content,
        is_enabled,
      };
      console.log(this.tempProduct);
      // axios
      //   .post(`${url}/api/${api_path}/admin/product`, this.tempProduct)
      //   .then((res) => {
      //     this.closeProductModal();
      //     this.renderProducts();
      //   })
      //   .catch((err) => {
      //     console.log(err.response);
      //   });
    },
  },

  computed: {
  },

  watch: {},

  // 初始化
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)xuanToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .post(`${url}/api/user/check`)
      .then((res) => {
        this.renderProducts();
        this.addProductModal();
      })
      .catch((err) => {
        alert(err.response.data.message);
        window.location = "index.html";
      });
  },
};

Vue.createApp(app).mount("#app");
