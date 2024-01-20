// 產品資料格式
const url = "https://ec-course-api.hexschool.io/v2";
const api_path = "xuan02";
let productModal = "";
let deleteModal="";

const app = {
  // 資料
  data() {
    return {
      products: [],
      isNew: false,
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

    // 開啟modal
    openModal(status, item) {
      // 先判斷狀態是「新增／編輯」，在帶入選擇的物件
      if (status == "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (status == "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (status == "delete") {
        this.tempProduct = { ...item };
        deleteModal.show();
      }
    },

    // 確認後執行的動作(儲存／修改)
    saveProduct(id) {
      if (this.isNew == true) {
        axios
          .post(`${url}/api/${api_path}/admin/product`, {
            data: this.tempProduct,
          })
          .then((res) => {
            alert(res.data.message);
            this.renderProducts();
            productModal.hide();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else if (this.isNew == false) {
        axios
          .put(`${url}/api/${api_path}/admin/product/${id}`, {
            data: this.tempProduct,
          })
          .then((res) => {
            alert(res.data.message);
            productModal.hide();
            this.renderProducts();
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },

    // 刪除
    delProduct(){
        axios
          .delete(`${url}/api/${api_path}/admin/product/${this.tempProduct.id}`)
          .then((res) => {
            alert(res.data.message);
            deleteModal.hide();
            this.renderProducts();
          })
          .catch((err) => {
            console.log(err.response);
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
    productModal = new bootstrap.Modal(document.getElementById("addModal"));
    deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));

    // 確認身份
    this.checkUser();
  },
};

Vue.createApp(app).mount("#app");
