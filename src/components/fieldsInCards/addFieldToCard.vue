<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Добавить</h4>
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
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import TextInput from "@/components/forms/text_input";
import selectKeyValue from "@/components/forms/select_keyValue";
import select_simple from "@/components/forms/select_simple";
import checkBox from "@/components/forms/checkBox";
import { mapGetters } from "vuex";
export default {
  props: {
    categories: {
      default: null,
    },
    firstSelected: {
      default: null,
    },
  },
  data: () => ({
    select: null,
    name: "",
    type: "",
    value: null,
    current: null,
    selected_object: null,
    refresh: false,
    newDate: false,
  }),
  validations: {
    name: { required },
    type: { required },
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  created() {
    if (this.firstSelected) {
      this.current = this.firstSelected;
    } else {
      this.current = this.categories[0].id;
    }
    this.refresh = !this.refresh;
  },
  components: {
    TextInput,
    selectKeyValue,
    checkBox,
    select_simple,
  },
  computed: {
    ...mapGetters(["AllCartFieldsTypes"]),
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        // this.$emit("updatefieldtype", this.selected_object);
      } catch (error) {}
    },
  },
  watch: {
    current(cur_ID) {
      this.selected_object = this.categories.find(
        (cat) => cat.id === this.current
      );
      this.name = this.selected_object.name;
      this.type = this.selected_object.type;
      this.value = this.selected_object.value;
      // this.limit = this.categories.find(cat => cat.id===cur_ID).limit
      console.log("current id is " + this.current);
      this.refresh = !this.refresh;
    },
    // name(new_obj) {
    //   if (this.selected_object.name != new_obj) {
    //     this.newDate = true;
    //   }
    //   this.selected_object.name = new_obj;
    // },
    // type(new_obj) {
    //   if (this.selected_object.type != new_obj) {
    //     this.newDate = true;
    //   }
    //   this.selected_object.type = new_obj;
    // },
    // value(new_obj) {
    //   if (this.selected_object.value != new_obj) {
    //     this.newDate = true;
    //   }
    //   this.selected_object.value = new_obj;
    // },
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
