<template>
  <h1 class="text-center mb-4">這是後台頁面</h1>
  <nav class="d-flex align-items-center justify-content-center">
    <router-link to="/admin/product" class="px-3">後台產品列表</router-link>|
    <router-link to="/admin/order" class="px-3">後台訂單</router-link>|
    <a href="#" class="px-3" @click.prevent="signout">登出</a>
    <router-link to="/home">
      <a href="#" class="btn btn-outline-secondary"> 回前台 </a>
    </router-link>
  </nav>
  <router-view v-if="checkSuccess"></router-view>
</template>

<style>
.active {
  color: green;
  font-weight: 500;
}
</style>

<script>
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    checkUser() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)xuanToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const api = `${VITE_URL}/v2/api/user/check`;
        this.$http
          .post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.$router.push('/login');
          });
      } else {
        alert('您尚未登入。');
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'xuanToken=;expires=;';
      alert('token 已清除');
      this.$router.push('/home');
    },
  },
  mounted() {
    this.checkUser();
  },
};
</script>
