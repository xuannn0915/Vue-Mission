// 產品資料格式
const url = "https://ec-course-api.hexschool.io/v2";
const api_path = "xuan02";

import pagination from "./pagination.js";
import productModal from "./productModal.js";
import deleteModal from "./deleteModal.js";


const app = {
  // 資料
  data() {
    return {
      products: [],
      isNew: false,
      pages:{},
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
    renderProducts(page=1) { //參數預設值
      axios
        .get(`${url}/api/${api_path}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
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
        this.$refs.addModal.openModal()
      } else if (status == "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.addModal.openModal()
      } else if (status == "delete") {
        this.tempProduct = { ...item };
        this.$refs.delModal.openModal();
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
            this.$refs.addModal.closeModal();
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
            this.$refs.addModal.closeModal();
            this.renderProducts();
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },

    // 刪除
    delProduct(id) {
      axios
        .delete(`${url}/api/${api_path}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.$refs.delModal.closeModal();
          this.renderProducts();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // 新增更多圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },

  // 區域註冊
  components:{
    pagination,
    productModal,
    deleteModal,
  },

  // 初始化
  mounted() {
    // token帶入header做驗證
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)xuanToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    // 確認身份
    this.checkUser();
  },
};

Vue.createApp(app).mount("#app");
