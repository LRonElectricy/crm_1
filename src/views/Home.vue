<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click.prevent="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Preloader v-if="loading" />
    <div class="row" v-else>
      <Bill :currencys="currency.results" />
      <Currency :currencys="currency.results" />
    </div>
  </div>
</template>

<script>
import Bill from "@/components/home/Bill";
import Currency from "@/components/home/Currency";
export default {
  name: "home",
  data: () => ({
    loading: true,
    currency: true,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;

  },
  components: {
    Bill,
    Currency,
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
};
</script>
