<template>
  <LoadingComponent :active="status.isLoading" />
  <div class="container">
    <div class="orderList pt-4 pb-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="fw-bold">#</th>
            <th scope="col" class="fw-bold">訂單編號</th>
            <th scope="col" class="fw-bold">訂單人姓名</th>
            <th scope="col" class="fw-bold">訂單金額</th>
            <th scope="col" class="fw-bold">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order" :key="item.id">
            <td>{{ item.num }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.total }}</td>
            <td :class="item.is_paid ? 'text-success' : 'text-danger'">
              {{ item.is_paid ? '已付款' : '未付款' }}
            </td>
          </tr>
        </tbody>
      </table>
      <p>目前有{{ order.length }}筆訂單</p>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      order: [],
      status: {
        isLoading: true,
      },
    };
  },
  methods: {
    renderOrder(page = 1) {
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.order = res.data.orders;
          this.status.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  mounted() {
    this.renderOrder();
  },
};
</script>
