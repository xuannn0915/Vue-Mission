// 產品資料格式
const url = 'https://ec-course-api.hexschool.io/v2';
const api_path='xuan02';

const app = {
  data() {
    return {
      username:'',
      password:'',
    };
  },
  methods: {
    login(){
      const username = this.username;
      const password = this.password;
      let user={
        username,
        password
      }
      axios.post(`${url}/admin/signin`, user)
      .then(res=>{
        const {expired, token}=res.data;
        document.cookie = `xuanToken = ${token}; expires = ${new Date(expired)}`;
        alert(res.data.message);
        window.location = 'backstage.html';
      })
      .catch(err=>{
        console.log(err.response)
        if(this.username == '' || this.password==''){
          alert ('欄位不可為空白！')
        }
        else{
          alert (`${err.response.data.message},請輸入正確鄭號密碼`)
        }
      })
    }
  }
};

Vue.createApp(app).mount("#app");
