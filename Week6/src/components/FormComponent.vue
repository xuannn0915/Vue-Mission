<template>
  <div class="my-5 row justify-content-center">
    <VForm ref="form" class="col-md-6" v-slot="{ errors }">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VField
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="userInfo.user.email"
        ></VField>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <VField
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="請輸入姓名"
          :class="{ 'is-invalid': errors['name'] }"
          rules="required"
          v-model="userInfo.user.name"
        ></VField>
        <ErrorMessage name="name" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <VField
          id="tel"
          name="tel"
          type="text"
          class="form-control"
          placeholder="請輸入電話"
          :class="{ 'is-invalid': errors['tel'] }"
          rules="required"
          v-model="userInfo.user.tel"
        ></VField>
        <ErrorMessage name="tel" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <VField
          id="address"
          name="address"
          type="text"
          class="form-control"
          placeholder="請輸入地址"
          :class="{ 'is-invalid': errors['address'] }"
          rules="required"
          v-model="userInfo.user.address"
        ></VField>
        <ErrorMessage name="address" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="userInfo.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="sendForm"
          :disabled="
            userInfo.user.name == '' ||
            userInfo.user.email == '' ||
            userInfo.user.tel == '' ||
            userInfo.user.address == ''
          "
        >
          送出訂單
        </button>
      </div>
    </VForm>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      userInfo: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    sendForm() {
      this.$http
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, { data: this.userInfo })
        .then((res) => {
          alert(res.data.message);
          this.cartList = [];
          this.cartTotal = 0;
          this.userInfo = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: '',
            },
            message: '',
          };
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
