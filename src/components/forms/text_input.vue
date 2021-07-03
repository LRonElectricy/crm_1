<template>
  <div :class="input_class">
    <i v-if="icon" class="material-icons prefix">{{ icon }}</i>
    <label>{{ lable }}</label>
    <input
      v-bind="$attrs"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      :class="{ [errorClass]: showError }"
      :placeholder="lable"
    />
    
    <span class="helper-text invalid" v-if="showError">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    input_class: {
      default: "input-field",
    },
    value:{
      type:[String, Number],
      default: ''
    },
    lable: "",
    error: "",
    showError: "",
    errorClass: "",
    icon: {
      default: null,
    },
  },
};
</script>
