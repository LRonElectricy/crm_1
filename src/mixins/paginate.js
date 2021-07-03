import _ from 'lodash'
export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 6,
      pageCount: 0,
      allItems: [],
      currentItems: []
    }

  },
  methods: {
    setupPaginate(items) {
      // this.currentItems= items
      this.allItems = _.chunk(items, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.currentItems = this.allItems[this.page - 1] || this.allItems[0]
      // this.$router.push(`${this.$route.path}?page=${this.page}`)
    },
    changePage(page) {
      // this.page = page;
      this.currentItems = this.allItems[this.page - 1] || this.allItems[0]
      this.$router.push(`${this.$route.path}?page=${this.page}`)
    }
  }
}
