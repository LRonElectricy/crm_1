<template>
  <div>
    <!-- <i v-if="icon" class="material-icons prefix">{{ icon }}</i>
    <label>{{ lable }}</label>
    <input
      v-bind="$attrs"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      :class="{ [errorClass]: showError }"
      :placeholder="lable"
    />

    <span class="helper-text invalid" v-if="showError">{{ error }}</span> -->
    <label>
      <input
        type="checkbox"
        v-model="value"
        v-bind="$attrs"
        @change="$emit('change', value)"
      />
      <span>{{ lable }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    input_class: {
      default: "input-field",
    },
    value: {
      type: [String, Number, Boolean],
      default: "false",
    },
    lable: "",
    error: "",
    showError: "",
    errorClass: "",
    icon: {
      default: null,
    },
  },
  watch: {
    value() {
      if (this.value == "true" || this.value) {
        console.log("true in watch");
        this.value = true;
      } else {
        console.log("false in watch");
        this.value = false;
      }
    },
  },
  mounted() {
    if (this.value == "true") {
      console.log("true");
      this.value = true;
    } else {
      console.log("false");
      this.value = false;
    }
    // M.updateTextFields();
  },
};
</script>
