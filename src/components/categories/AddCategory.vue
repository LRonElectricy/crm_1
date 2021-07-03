<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >Минимальная величина {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  data: () => ({
    title: "",
    limit: 100,
    category: {}
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async onSubmit() {
      //  this.$message('вы создали категорию');
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let categoryData = {
        title: this.title,
        limit: this.limit,
      };
      try {
        this.category = await this.$store.dispatch("addCategory", categoryData);
        this.title = "";
        this.limit = 100;
        this.$v.$reset();
        this.$message(`категорию ${this.category.title} создана`);
        // console.log(category);
      } catch (error) {}
    },
  },
  watch:{
    category(){
      // console.log(this.category);
      this.$emit('addcategory',this.category)
    }
  }
};
</script>
