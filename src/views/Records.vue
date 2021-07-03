<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Preloader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Добавти категорию
      <router-link to="/categories" tag="a">здесь</router-link>
    </p>
    <form class="form" @submit.prevent="onSubmit" v-else>
      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="moneyDir"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="moneyDir"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="sum"
          :class="{ invalid: this.$v.sum.$dirty && !this.$v.sum.minValue }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="this.$v.sum.$dirty && !this.$v.sum.minValue"
          >введите значение больше 1</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid:
              this.$v.description.$dirty && !this.$v.description.required,
          }"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="this.$v.description.$dirty && !this.$v.description.required"
          >введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
// import Preloader from "../components/app/Preloader.vue";
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  // components: { Preloader },
  data: () => ({
    loading: true,
    categories: [],
    current: null,
    moneyDir: "outcome",
    sum: 1,
    description: "",
  }),
  validations: {
    sum: { minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("getCategories");
      this.loading = false;
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      });
      if (this.categories.length) {
        this.current = this.categories[0].id;
      }

      // console.log(this.categories);
    } catch (error) {}
  },
  watch: {},
  computed:{
    ...mapGetters(['info']),
    canCreateNewRec(){
      if(this.moneyDir=== 'income'){
        return true
      }
      return this.info.bill >= this.sum;
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        if(!this.canCreateNewRec){
          this.$error(`не хватает средств ( ${this.sum - this.info.bill} р. )`);
          return;
        }
        let recData = {
          category: this.current,
          moneyDir: this.moneyDir,
          sum: this.sum,
          description: this.description,
          date: new Date().toJSON()
        };
        let newRecKey = (await this.$store.dispatch("addRec",recData)).key;
        const newBill = this.moneyDir === 'income' ? this.info.bill + this.sum : this.info.bill - this.sum
        console.log(newBill);
        await this.$store.dispatch('updateInfo', {newBill})
        this.$message("запись добавлена");
        this.$v.$reset();
        this.sum = 1;
        this.description = "";
      } catch (error) {}
    },
  },
};
</script>
