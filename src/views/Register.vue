<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <!-- <div class="input-field">
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
      </div> -->

      <TextInput
        type="email"
        v-model="email"
        :lable="'Email'"
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
        :showError="
          $v.password.$dirty &&
          (!$v.password.required ||
            !$v.password.minLength ||
            !$v.password.maxLength)
        "
        :errorClass="'invalid'"
        :icon="'security'"
      />

      <!-- <div class="input-field">
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
      </div> -->

      <TextInput
        type="text"
        v-model="name"
        :lable="'Имя'"
        :error="'введите имя'"
        :showError="$v.name.$dirty && !$v.name.required"
        :errorClass="'invalid'"
        :icon="'account_box'"
      />

      <!-- <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="name">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Enter Your Name</small
        >
      </div> -->

      <TextInput
        type="text"
        v-model="second_name"
        :lable="'Фамилия'"
        :error="'введите фамилию'"
        :showError="$v.second_name.$dirty && !$v.second_name.required"
        :errorClass="'invalid'"
        :icon="'account_box'"
      />

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
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
import TextInput from "@/components/forms/text_input";
export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    second_name: "",
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(4), maxLength: maxLength(11) },
    name: { required },
    second_name: { required },
    agree: {
      checked: (v) => {
        return v;
      },
    },
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
        name: this.name,
      };
      try {
        await this.$store.dispatch("register", formData);
        console.log(formData);
        this.$router.push("/");
      } catch (error) {}
    },
  },
  components: {
    TextInput,
  },
};
</script>
