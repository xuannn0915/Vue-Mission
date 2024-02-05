// 先把元件環境建立好
// 把版型加入
// 解除版型內的錯誤

export default {
  props: ['pages'],
  methods:{
    choosePage(num){
      this.$emit('choose-page',num)
    }
  },
  template: ` <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled:!pages.has_pre}"><a class="page-link" href="#" @click="renderProducts(pages.current_page-1)">Previous</a></li>
    <li class="page-item" v-for="page in pages.total_pages" :key="page+123" :class="{active:page===pages.current_page}"><a class="page-link" href="#" @click ="choosePage(page)">{{page}}</a></li>
    <li class="page-item" :class="{disabled:!pages.has_next}"><a class="page-link" href="#" @click="renderProducts(pages.current_page+1)">Next</a></li>
  </ul>
</nav>`,
};
