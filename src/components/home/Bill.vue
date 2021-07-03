<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line">
          <span>{{ this.$store.getters.USER.bill | currency('RUB') }}</span>
        </p>
        <p class="currency-line" v-for="currency of currencys" :key="currency">
          <span>{{ getInCurrenct(currency.val) | currency(currency.to) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currencys"],
  mounted() {
    // console.log(this.currencys);
  },
  computed: {
    bace() {
      return this.$store.getters.USER.bill;
    },
  },
  methods: {
    getInCurrenct(rate) {
      return this.bace * rate;
    },
  },
};
</script>
