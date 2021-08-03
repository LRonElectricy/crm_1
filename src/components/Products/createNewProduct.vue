<template>
  <div class="col s12">
    <div class="page-subtitle">
      <h4>Поля</h4>
    </div>
    <TextInput
            :key="refresh"
            type="text"
            v-model="productName"
            :lable="'название продукта'"
          />
    <div v-for="Type in fields" :key="Type.id">
      <CardFieldPeview
        @deletItem="deletItem"
        :showDelete="false"
        :oneCategoty="
          AllCartFields.find((field) => field.id === Type.field_types)
        "
      />
    </div>
    <div>
      <button class="btn waves-effect waves-light green" @click.prevent="onSubmit">
        создать
      </button>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/forms/text_input";
import selectKeyValue from "@/components/forms/select_keyValue";
import select_simple from "@/components/forms/select_simple";
import checkBox from "@/components/forms/checkBox";
import { mapGetters } from "vuex";

import CardFieldPeview from "@/components/cardFields/CardFieldPeview";
export default {
  props: {
    fields: {
      // default: null,
      required: true,
    },
  },
  data: () => ({
    refresh: false,
    productName:''
  }),
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  created() {
    this.refresh = !this.refresh;
  },
  components: {
    TextInput,
    selectKeyValue,
    checkBox,
    select_simple,
    CardFieldPeview,
  },
  computed: {
    ...mapGetters(["AllCartFields"]),
  },
  methods: {
    async onSubmit() {
      try {
        // await this.$store.dispatch('updateCategorie',categoryData)
        // this.$message(`вы обновили ${this.title}`);
        // this.$emit("updatefieldtype", this.selected_object);
        // console.log(this.fields);
        let newProduct={};
        newProduct.name=this.productName;
        for(let i=0; i<this.fields.length; i++){
          let oneCategoty = this.AllCartFields.find((field) => field.id === this.fields[i].field_types)
          // console.log(i+':');
          // console.log(oneCategoty);
          let fieldID=`f${i}`
          newProduct[i]={}
          newProduct[i].field_types=oneCategoty.id;
          newProduct[i].value=oneCategoty.value;
          if(oneCategoty.current){
            newProduct[i].value = oneCategoty.current
          }
        }
        console.log(newProduct);
      } catch (error) {}
    },
  },
};
</script>
