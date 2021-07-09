<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <TextInput
          type="text"
          v-model="name"
          :lable="'Название'"
          :error="'введите название'"
          :showError="$v.name.$dirty && !$v.name.required"
          :errorClass="'invalid'"
        />

        <selectKeyValue
          :key="refresh"
          v-model="type"
          :value="type"
          :options="AllCartFieldsTypes"
          :showName="'name'"
          :keyName="'id'"
          :lable="'Тип'"
          @change="
            (e) => {
              type = e;
            }
          "
        />

        <TextInput
          v-if="type != 2 && type != 1"
          type="text"
          v-model="value"
          :lable="'Настройки'"
          :error="'введите Настройки'"
          :errorClass="'invalid'"
        />
        <checkBox
          v-if="type == 1"
          type="text"
          v-model="value"
          :lable="'по умолчанию'"
          @change="
            (e) => {
              value = e;
            }
          "
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
import selectKeyValue from "@/components/forms/select_keyValue";
import checkBox from "@/components/forms/checkBox";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    name: "",
    type: null,
    value: null,
  }),
  validations: {
    name: { required },
  },
  mounted() {
    M.updateTextFields();
  },
  components: {
    TextInput,
    selectKeyValue,
    checkBox,
  },
  computed: {
    ...mapGetters(["AllCartFieldsTypes"]),
  },
  created() {
    this.type = this.AllCartFieldsTypes[0].id;
    // this.refresh = !this.refresh;
  },
  watch: {
    type() {
      this.type = this.type;
    },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        this.$emit("addfieldtype", {
          name: this.name,
          type: this.type,
          value: this.value,
        });
        this.name = "";
        this.$v.$reset();
      } catch (error) {}
    },
  },
};
</script>
