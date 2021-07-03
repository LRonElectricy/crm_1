<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <TextInput
          type="text"
          v-model="title"
          :lable="'Название'"
          :error="'введите название'"
          :showError="$v.title.$dirty && !$v.title.required"
          :errorClass="'invalid'"
        />

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import TextInput from "@/components/forms/text_input";
export default {
  data: () => ({
    title: "",
  }),
  validations: {
    title: { required },
  },
  mounted() {
    M.updateTextFields();
  },
  components: {
    TextInput,
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        this.$emit('addcategory',this.title)
        this.title = "";
        this.$v.$reset();
      } catch (error) {}
    },
  },
};
</script>
