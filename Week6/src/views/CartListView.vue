<template>
  <main class="p-4">
    <h2>這是購物車列表頁</h2>
    <LoadingComponent :active="status.isLoading" />
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="deleteAll"
        :disabled="cartList.length == 0 || status.deleteLoading == true"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="status.deleteLoading"
        ></span>
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="inline-size: 150px">數量/單位</th>
          <th class="text-end">單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartList.length">
          <tr v-for="item in cartList" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteProduct(item.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <!-- <div class='text-success'>已套用優惠券</div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    value="item.qty"
                    v-model="item.qty"
                    @change="changeCartNum(item, item.qty)"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <!-- <small class='text-success'>折扣價：</small> -->
              {{ item.total }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" class="border-0 text-center text-secondary">
              尚無商品加入購物車
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cartTotal }}</td>
        </tr>
        <!-- <tr>
                  <td colspan='3' class='text-end text-success'>折扣價</td>
                  <td class='text-end text-success'>{{ }}</td>
                </tr> -->
      </tfoot>
    </table>
  </main>

  <FormComponent></FormComponent>
</template>

<script>
import FormComponent from '../components/FormComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      cartList: [],
      cartTotal: 0,
      delProduct: {},
      status: {
        deleteLoading: false,
        isLoading: true,
      },
    };
  },
  methods: {
    renderCartList() {
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.cartList = res.data.data.carts;
          this.cartTotal = res.data.data.final_total;
          this.status.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    changeCartNum(product, qty = 1) {
      const item = {
        product_id: product.product_id,
        qty,
      };
      this.$http
        .put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${product.id}`, {
          data: item,
        })
        .then((res) => {
          alert(res.data.message);
          this.renderCartList();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteAll() {
      this.status.deleteLoading = true;
      this.$http
        .delete(`${VITE_URL}/v2/api/${VITE_PATH}/carts`)
        .then((res) => {
          alert(res.data.message);
          this.status.deleteLoading = false;
          this.renderCartList();
        })
        .catch((err) => {
          console.log(err.response.message);
        });
    },
    deleteProduct(id) {
      this.$http
        .delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.renderCartList();
        });
    },
  },
  components: {
    FormComponent,
  },
  mounted() {
    this.renderCartList();
  },
};
</script>
