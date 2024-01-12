// 產品資料格式
const url = 'https://ec-course-api.hexschool.io/v2';
const api_path='xuan02';

const app = {
  data() {
    return {
      products: [],
      detail:{},
      isChosenHint:true,
      username:'',
      password:'',
    };
  },
  methods: {
    renderProducts(){
      axios.get(`${url}/api/${api_path}/admin/products`)
      .then((res)=>{
        this.products = res.data.products;
        console.log(this.products);
      })
      .catch((err)=>{
        console.log(err.response);
      })
    },
    getProduct(id){
      this.products.forEach((item)=>{
        if(id===item.id){
          this.detail={...item};
        }
      });
      this.isChosenHint=false;
    },
      
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)xuanToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common['Authorization'] = token;

    axios.post(`${url}/api/user/check`)
    .then((res)=>{
      this.renderProducts()
    })
    .catch((err)=>{
      alert(err.response.data.message);
      window.location = 'index.html';
    })
  }
};

Vue.createApp(app).mount("#app");
