// 產品資料格式
const url = 'https://ec-course-api.hexschool.io/v2';
const api_path='xuan02';

const productList =[
  {
      "title": "柳橙汁",
      "category": "飲品",
      "origin_price": 30,
      "price": 20,
      "unit": "瓶",
      "description": "柳橙汁好喝",
      "content": "這是一瓶很好喝的柳橙汁",
      "is_enabled": 20,
      "imageUrl": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imagesUrl": [
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1621506289894-c3a62d6be8f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    }
]

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
