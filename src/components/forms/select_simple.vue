<template>
  <div :class="input_class">
    <i v-if="icon" class="material-icons prefix">{{ icon }}</i>
    <select
      :value="value"
      ref="select"
      v-bind="$attrs"
      @change="$emit('change', $event.target.value)"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
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
    options: {
      type:Array,
      required:true
    },
    icon: {
      default: null,
    },
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);

    // console.log(this.categories);
  },
  created() {
    // this.value = this.options[0];
    // this.$emit('change',this.value)
  },
};
</script>

// <SelectSimple v-model="selected" :value="selected" @change="(e)=>{selected=e}"/>
