<template>
  <div>
    <Preloader v-if="loading" />
    <p v-else-if="!record" class="center">
      записи с id:'{{ this.$route.params.id }}' не существует
    </p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ this.record.moneyDir === "outcome" ? "расход" : "доход" }}
        </a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: this.record.moneyDir === 'outcome',
              green: this.record.moneyDir === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ this.record.description }}</p>
              <p>Сумма: {{ this.record.sum | currency("RUB") }}</p>
              <p>Категория: {{ this.category.title }}</p>

              <small>{{ this.record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    category: null,
    record: null,
  }),
  async mounted() {
    try {
      let id = this.$route.params.id;

      this.record = await this.$store.dispatch("getRecordByID", id);
      this.category = await this.$store.dispatch(
        "getCategoryByID",
        this.record.category
      );

      this.loading = false;
    } catch (error) {}
  },
};
</script>
