<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
      
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: ["categories"],
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
    
    // console.log(this.categories);
   
    
  },
  created(){
    
    this.current=this.categories[0].id;
    this.title=this.categories[0].title;
    this.limit=this.categories[0].limit;
  },
  methods: {
    async onSubmit() {
      //  this.$message('вы создали категорию');
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let categoryData={
        title: this.title,
        limit: this.limit,
        id: this.current
      }
      try {
        await this.$store.dispatch('updateCategorie',categoryData)
        this.$message(`вы обновили категорию ${this.title}`);
        this.$emit('updatecategorie',categoryData);

      } catch (error) {
        
      }
    },
  },
  watch:{
    current(curID){
      this.title = this.categories.find(cat => cat.id===curID).title
      this.limit = this.categories.find(cat => cat.id===curID).limit
      console.log(this.current);
    }
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
