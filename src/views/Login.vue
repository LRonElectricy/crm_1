<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: $v.email.$dirty && (!$v.email.required || !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >Enter email</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >Enter correct email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              $v.password.$dirty &&
              (!$v.password.required ||
                !$v.password.minLength ||
                !$v.password.maxLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Enter Password</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Too small, you need {{ $v.password.$params.minLength.min }} chars,
          {{ password.length }} entered</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.maxLength"
          >Too big, you need {{ $v.password.$params.maxLength.max }} chars,
          {{ password.length }} entered</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register"> Зарегистрироваться </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {
  email,
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import Messages from "@/utils/messages";
export default {
  name: "login",
  data: () => ({
    email: "",
    password: "",
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(4), maxLength: maxLength(11) },
  },
  mounted() {
    if (Messages[this.$route.query.message]) {
      this.$message(Messages[this.$route.query.message]);
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", formData);
        console.log(this.$store.getters.USER);
        this.$router.push("/");
      } catch (error) {}
    },
  },
};
</script>
