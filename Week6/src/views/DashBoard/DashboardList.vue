<template>
  <LoadingComponent :active="status.isLoading" />
  <div class="container">
    <div class="productList pt-4 pb-4">
      <div class="d-flex justify-content-end mb-5">
        <button type="button" class="btn btn-primary" @click="openModal('new')">
          建立新的產品
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="fw-bold">分類</th>
            <th scope="col" class="fw-bold">產品名稱</th>
            <th scope="col" class="fw-bold">原價</th>
            <th scope="col" class="fw-bold">售價</th>
            <th scope="col" class="fw-bold">是否啟用</th>
            <th scope="col" class="fw-bold">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td :class="item.is_enabled ? 'text-success' : 'text-danger'">
              {{ item.is_enabled ? '啟用' : '停用' }}
            </td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="openModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>目前有{{ products.length }}項產品</p>
      <PaginationComponent :pages="pagesInfo" @choose-page="renderProducts"></PaginationComponent>
    </div>
  </div>

  <!-- Modal -->
  <DashboardModal ref="dashboardModal" :temp-product="tempProduct"></DashboardModal>
  <DeleteModal :del-product="tempProduct" @del="delProduct" ref="deleteModal"></DeleteModal>
</template>

<script>
import PaginationComponent from '../../components/PaginationComponent.vue';
import DashboardModal from '../../components/DashboardModal.vue';
import DeleteModal from '../../components/DeleteModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      isNew: false,
      pagesInfo: {},
      tempProduct: {
        imagesUrl: [],
      },
      status: {
        isLoading: true,
      },
    };
  },

  // 方法
  methods: {
    // 渲染列表
    renderProducts(page = 1) {
      // 參數預設值
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagesInfo = res.data.pagination;
          this.status.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },

    // 開啟modal
    openModal(status, item) {
      // 先判斷狀態是「新增／編輯」，在帶入選擇的物件
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.dashboardModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.dashboardModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = { ...item };
        this.$refs.deleteModal.openModal();
      }
    },

    // 確認後執行的動作(儲存／修改)
    saveProduct(id) {
      if (this.isNew === true) {
        this.$http
          .post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product`, {
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
      } else if (this.isNew === false) {
        this.$http
          .put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${id}`, {
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
      this.$http
        .delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.$refs.deleteModal.closeModal();
          this.renderProducts();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // 新增更多圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },

  // 區域註冊
  components: {
    PaginationComponent,
    DashboardModal,
    DeleteModal,
  },
  mounted() {
    this.renderProducts();
  },
};
</script>
