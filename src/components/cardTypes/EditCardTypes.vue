<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <selectKeyValue
          ref="select"
          v-model="current"
          :value="current"
          :options="categories"
          :showName="'name'"
          :keyName="'id'"
          @change="
            (e) => {
              current = e;
            }
          "
        />

        <TextInput
          type="text"
          v-model="title"
          :lable="'Название'"
          :error="'введите название'"
          :showError="$v.title.$dirty && !$v.title.required"
          :errorClass="'invalid'"
        />
        <button
          class="btn waves-effect waves-light red"
          @click.prevent="$emit('deletItem', { id: current, name: title })"
        >
          Удалить
          <i class="material-icons right">delete_forever</i>
        </button>
        <br /><br />
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import TextInput from "@/components/forms/text_input";
import selectKeyValue from "@/components/forms/select_keyValue";
export default {
  props: ["categories"],
  data: () => ({
    select: null,
    title: "",
    current: null,
  }),
  validations: {
    title: { required },
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  created() {
    this.current = this.categories[0].id;
    this.title = this.categories[0].name;
  },
  components: {
    TextInput,
    selectKeyValue,
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let categoryData = {
        name: this.title,
        // limit: this.limit,
        id: this.current,
      };
      try {
        // await this.$store.dispatch('updateCategorie',categoryData)
        this.$message(`вы обновили ${this.title}`);
        this.$emit("updatecategorie", categoryData);
      } catch (error) {}
    },
  },
  watch: {
    current(cur_ID) {
      this.title = this.categories.find((cat) => cat.id === cur_ID).name;
      // this.limit = this.categories.find(cat => cat.id===cur_ID).limit
      console.log(this.current);
    },
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
