export default {
  props: ["pages"],
  methods: {
    choosePage(num){
      this.$emit('choose-page',num)
    }
  },
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled:!pages.has_pre}">
    <a class="page-link" href="#"><<</a>
    </li>
    <li class="page-item" v-for="page in pages.total_pages" :key="page+123"  :class="{active:pages.current_page === page}">
    <a class="page-link" href="#" @click.prevent="choosePage(page)">{{page}}</a>
    </li>
    <li class="page-item" :class="{disabled:!pages.has_next}">
    <a class="page-link" href="#">>></a>
    </li>
  </ul>
</nav>`,
};
