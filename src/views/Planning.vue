<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ this.$store.getters.info.bill | currency("RUB") }}</h4>
    </div>

    <Preloader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Добавти категорию
      <router-link to="/categories" tag="a">здесь</router-link>
    </p>
    <section v-else>
      <div v-for="c in calculatedCategories" :key="c.id">
        <p>
          <strong>{{ c.title }}:</strong>
          {{ c.spent | currency("RUB") }} из {{ c.limit | currency("RUB") }}
        </p>
        <Linear :color="c.color" :width="c.percent" v-tooltip="c.tooltip" />
      </div>
    </section>
  </div>
</template>

<script>
import currencyFilter from '@/filters/currency-filter'
export default {
  data: () => ({
    loading: true,
    categories: [],
    records: [],
    calculatedCategories: [],
  }),
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("getCategories");
      this.records = await this.$store.dispatch("getRecords");

      this.calculatedCategories = this.categories.map((cat) => {
        let spent = this.records
          .filter((r) => r.category === cat.id)
          .filter((r) => r.moneyDir === "outcome")
          .reduce((total, rec) => {
            return (total += 0 + rec.sum);
          }, 0);
        let percent =
          (100 * spent) / cat.limit > 100 ? 100 : (100 * spent) / cat.limit;
        let color = percent < 50 ? "green" : percent < 100 ? "yellow" : "red";
        let tooltip = ( (cat.limit-spent > 0) ? 'можно еще потратить ': 'вы превысели на ') + currencyFilter(Math.abs(spent-cat.limit), 'RUB')
        return { ...cat, spent, percent, color, tooltip };
      });
      this.loading = false;
    } catch (error) {}
  },
};
</script>
