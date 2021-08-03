<template>
  <div class="col s12">
    <div>
      <div class="page-subtitle">
        <h4>Карточки</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <selectKeyValue
          ref="select"
          v-model="current"
          :value="current"
          :options="categories"
          :showName="'name'"
          :keyName="'id'"
          :lable="'выбери карточку'"
          :key="refresh"
          @change="
            (e) => {
              current = e;
            }
          "
        />
        <selectKeyValue
          ref="select2"
          v-model="toAdd"
          :value="toAdd"
          :options="fields"
          :showName="'name'"
          :keyName="'id'"
          :lable="'добавить поле'"
          :key="refresh"
          @change="
            (e) => {
              toAdd = e;
            }
          "
        />
        <button class="btn waves-effect waves-light" type="submit">
          Добавить
          <i class="material-icons right">send</i>
        </button>
        <br /><br />
      </form>
    </div>
  </div>
</template>

<script>
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
    fields: {
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
    toAdd: null,
    refresh: false,
  }),
  mounted() {
    M.updateTextFields();
    // this.select = M.FormSelect.init(this.$refs.select);
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
      try {
        if (this.toAdd !== null) {
          this.$emit("addFieldToCard", {'card':this.current, 'field':this.toAdd});
          this.toAdd=null;
          this.refresh = !this.refresh;
        }
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
      this.$emit("selectcard", this.current);
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
