<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Preloader v-if="loading" />
    <p class="center" v-else-if="!currentItems.length">
      Добавти запись
      <router-link to="/records" tag="a">здесь</router-link>
    </p>
    <section v-else>
      <roomPayments :records="currentItems"/>
      <Paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="changePage"
        :prevText="'Prev'"
        :nextText="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
      
    </section>
  </div>
</template>

<script>
// import Records from "@/components/history/records";
import roomPayments from "@/components/history/roomPayments";
import Paginate from "@/mixins/paginate";
// import currencyFilter from "@/filters/currency-filter";
export default {
  name: "payments",
  mixins: [Paginate],
  data: () => ({
    loading: true,
    // categories: [],
    // records: [],
    calculatedRecords: [],

    //playflow
    roomPayments: []
  }),
  components: {
    roomPayments
  },
  methods: {
    functionName() {},
  },
  async mounted() {
    try {
      // this.categories = await this.$store.dispatch("getCategories");
      // this.records = await this.$store.dispatch("getRecords");

      // this.setupPaginate(
      //   this.records.map((rec) => {
      //     let categoryName = this.categories.find((c) => c.id === rec.category)
      //       .title;
      //     let recColor = rec.moneyDir === "income" ? "green" : "red";
      //     let recText = rec.moneyDir === "income" ? "доход" : "расход";
      //     return {
      //       ...rec,
      //       categoryName,
      //       recColor,
      //       recText,
      //     };
      //   })
      // );

      //playflow
      this.setupPaginate(await this.$store.dispatch("getRoomPayments"));

      this.loading = false;
    } catch (error) {}
  },
};
</script>
