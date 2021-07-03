<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <Preloader v-if="loading" />
    <form class="form" @submit.prevent="onSubmit" v-else>
      <TextInput
        type="text"
        v-model="nameProfile"
        :lable="'Имя'"
        :error="'введите имя'"
        :showError="$v.nameProfile.$dirty && !$v.nameProfile.required"
        :errorClass="'invalid'"
        :icon="'account_box'"
      />
      <TextInput
        type="text"
        v-model="secomdNameProfile"
        :lable="'Фамилия'"
        :error="'введите фамилию'"
        :showError="
          $v.secomdNameProfile.$dirty && !$v.secomdNameProfile.required
        "
        :errorClass="'invalid'"
        :icon="'account_box'"
      />
      <TextInput
        type="email"
        v-model="email"
        :lable="'email'"
        :error="'введите корректный email'"
        :showError="$v.email.$dirty && (!$v.email.required || !$v.email.email)"
        :errorClass="'invalid'"
        :icon="'email'"
      />
      <TextInput
        type="password"
        v-model="password"
        :lable="'Пароль'"
        :error="'введите корректный пароль'"
        :showError="$v.password.$dirty && !$v.password.required"
        :errorClass="'invalid'"
        :icon="'security'"
      />
      <SelectSimple
        v-model="selected"
        :value="selected"
        :options="options"
        @change="
          (e) => {
            selected = e;
          }
        "
        :icon="'assignment_ind'"
      />
      <button
        class="btn waves-effect waves-light"
        type="submit"
        :class="{ disabled: $v.nameProfile.$dirty && !$v.nameProfile.required }"
      >
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import TextInput from "@/components/forms/text_input";
import SelectSimple from "@/components/forms/select_simple";
export default {
  name: "profile",
  data: () => ({
    loading: true,
    nameProfile: "",
    secomdNameProfile: "",
    email: "",
    password: "",
    selected: "",
    options:["guest", "manager", "admin"]
  }),
  validations: {
    nameProfile: { required },
    secomdNameProfile: { required },
    email: { required, email },
    password: { required },
  },
  mounted() {
    this.nameProfile = this.$store.getters.USER.first_name;
    this.secomdNameProfile = this.$store.getters.USER.last_name;
    this.email = this.$store.getters.USER.email;
    this.password = this.$store.getters.USER.password;
    this.selected = this.$store.getters.USER.role;
    this.loading = false;
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.loading = true;
      console.log(this.nameProfile);
      console.log(this.secomdNameProfile);
      console.log(this.email);
      console.log(this.password);
      console.log(this.selected);

      await this.$store.dispatch("updateUser", {
        email: this.email,
        password: this.password,
        firs_name: this.nameProfile,
        last_name: this.secomdNameProfile,
        role: this.selected,
      });
      this.loading = false;
      setTimeout(() => {
        M.updateTextFields();
      });
    },
    onChange(opt) {
      // this.selected=opt
      // console.log(opt)
    },
  },
  components: {
    TextInput,
    SelectSimple,
  },
};
</script>
