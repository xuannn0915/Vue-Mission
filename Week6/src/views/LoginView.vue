<!-- eslint-disable max-len -->
<template>
  <div class='container pt-5'>
    <div class='row'>
      <div class='col-3 mx-auto'>
        <h1 class='fw-bold h2 mb-4 text-center'>請先登入</h1>
        <form action='#'>
          <div class='form-floating mb-3'>
            <input
              type='email'
              class='form-control'
              id='floatingInput'
              placeholder='name@example.com'
              v-model='username'
            />
            <label for='floatingInput'>Email address</label>
          </div>
          <div class='form-floating mb-3'>
            <input
              type='password'
              class='form-control'
              id='floatingPassword'
              placeholder='Password'
              v-model='password'
            />
            <label for='floatingPassword'>Password</label>
          </div>
          <button type='button' class='btn btn-primary w-100' @click='login'>
            登入
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- <div class='alert alert-warning' role='alert' ref='alert'>
    A simple warning alert—check it out!
  </div> -->
</template>

<script>
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      username: '',
      password: '',
      alert: null,
    };
  },
  methods: {
    login() {
      const { username } = this;
      const { password } = this;
      const user = {
        username,
        password,
      };
      this.$http
        .post(`${VITE_URL}/admin/signin`, user)
        .then((res) => {
          const { expired, token } = res.data;
          document.cookie = `xuanToken = ${token}; expires = ${new Date(expired)}`;
          alert(res.data.message);
          this.$router.push('/admin/product');
        })
        .catch((err) => {
          if (this.username === '' || this.password === '') {
            alert('欄位不可為空白！');
          } else {
            alert(`${err.response.data.message},請輸入正確帳號密碼`);
          }
        });
    },
  },
};
</script>
