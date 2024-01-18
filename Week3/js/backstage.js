// 產品資料格式
const url = 'https://ec-course-api.hexschool.io/v2';
const api_path='xuan02';

const app = {
  data() {
    return {
      products: [],
      isChosenHint:true,
    };
  },
  methods: {
    renderProducts(){
      axios.get(`${url}/api/${api_path}/admin/products`)
      .then((res)=>{
        this.products = res.data.products;
      })
      .catch((err)=>{
        console.log(err.response);
      })
    },
    addProductModal(){
      const addProduct = document.querySelector('#addProduct');
      const addProductModal = new bootstrap.Modal(addProduct);
      addProductModal.show();
    }      
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)xuanToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common['Authorization'] = token;

    axios.post(`${url}/api/user/check`)
    .then((res)=>{
      this.renderProducts();
      this.addProductModal()
    })
    .catch((err)=>{
      alert(err.response.data.message);
      window.location = 'index.html';
    })
  }
};

Vue.createApp(app).mount("#app");
