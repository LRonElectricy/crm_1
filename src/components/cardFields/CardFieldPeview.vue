<template>
  <div class="col s12">
    <div class="card-panel hoverable col s12">
      <div class="section">
        <!-- <div class="col s6">{{ oneCategoty.name }}</div> -->
        <div class="col s6">
          {{ oneCategoty.name }}
          <select_simple
            v-if="oneCategoty.type == 3"
            :key="oneCategoty.id"
            :value="oneCategoty.value.split(';')[0]"
            :options="oneCategoty.value.split(';')"
            @change="
              (e) => {
                current = e;
              }
            "
          />
          <checkBox
            v-if="oneCategoty.type == 1"
            :key="oneCategoty.id"
            type="text"
            v-model="oneCategoty.value"
            :lable="'по умолчанию'"
            @change="
              (e) => {
                value = e;
              }
            "
          />
          <TextInput
            type="number"
            v-if="oneCategoty.type == 4 || oneCategoty.type == 5"
            v-model="oneCategoty.value"
            :lable="'число'"
          />
          <TextInput
              v-if="oneCategoty.type == 2"
              :key="refresh"
              type="text"
              v-model="oneCategoty.value"
              :lable="'Текст'"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { required } from "vuelidate/lib/validators";
import TextInput from "@/components/forms/text_input";
import select_simple from "@/components/forms/select_simple";
import selectKeyValue from "@/components/forms/select_keyValue";
import checkBox from "@/components/forms/checkBox";
import { mapGetters } from "vuex";
export default {
  props: ["oneCategoty"],
  data: () => ({
    title: "",
    current: null,
  }),
  // validations: {
  //   title: { required },
  // },
  mounted() {
    M.updateTextFields();
    console.log(this.oneCategoty);
    // this.select = M.FormSelect.init(this.$refs.select);
  },
  created() {
    // this.current = this.categories[0].id;
    // this.title = this.categories[0].name;
  },
  components: {
    TextInput,
    selectKeyValue,
    select_simple,
    checkBox,
  },
  computed: {
    ...mapGetters(["AllCartFieldsTypes"]),
  },
  methods: {
    oneRow() {
      let ret = `${this.oneCategoty.name} - ${
        this.AllCartFieldsTypes.find(
          (type) => type.id === this.oneCategoty.type
        ).name
      }`;
      if (this.oneCategoty.value && this.oneCategoty.value !== "null") {
        ret += ` - ${this.oneCategoty.value}`;
      }
      return ret;
      //{{oneCategoty.name}} - {{AllCartFieldsTypes.find(type=>(type.id === oneCategoty.type)).name}} - {{oneCategoty.value}}
    },
    async onSubmit() {
      // if (this.$v.$invalid) {
      //   this.$v.$touch();
      //   return;
      // }
      // let categoryData = {
      //   name: this.title,
      //   // limit: this.limit,
      //   id: this.current,
      // };
      try {
        // await this.$store.dispatch('updateCategorie',categoryData)
        this.$message(`вы обновили ${this.title}`);
        this.$emit("updatecategorie", categoryData);
      } catch (error) {}
    },
  },
  // watch: {
  //   current(cur_ID) {
  //     this.title = this.categories.find((cat) => cat.id === cur_ID).name;
  //     this.limit = this.categories.find(cat => cat.id===cur_ID).limit
  //     console.log(this.current);
  //   },
  // },
  // beforeDestroy() {
  //   if (this.select && this.select.destroy) {
  //     this.select.destroy();
  //   }
  // },
};
</script>
