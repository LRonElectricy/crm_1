<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
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
        <div v-if="!previewMode">
          <TextInput
            type="text"
            v-model="name"
            :lable="'Название'"
            :error="'введите название'"
            :showError="$v.name.$dirty && !$v.name.required"
            :errorClass="'invalid'"
          />

          <selectKeyValue
            :key="refresh"
            v-model="type"
            :value="type"
            :options="AllCartFieldsTypes"
            :showName="'name'"
            :keyName="'id'"
            :lable="'Тип'"
            @change="
              (e) => {
                type = e;
              }
            "
          />

          <!-- <TextInput
          type="text"
          v-model="type"
          :lable="'Тип'"
          :error="'введите тип'"
          :showError="$v.type.$dirty && !$v.type.required"
          :errorClass="'invalid'"
        /> -->
          <TextInput
            v-if="type != 2 && type != 1"
            :key="refresh"
            type="text"
            v-model="value"
            :lable="'Настройки'"
            :error="'введите Настройки'"
            :errorClass="'invalid'"
          />

          <checkBox
            v-if="type == 1"
            :key="selected_object.id"
            type="text"
            v-model="value"
            :lable="'по умолчанию'"
            @change="
              (e) => {
                value = e;
              }
            "
          />

          <div class="control_buts">
            <div>
              <button
                class="btn waves-effect waves-light red"
                @click.prevent="
                  $emit('deletItem', { id: current, name: title })
                "
              >
                Удалить
                <i class="material-icons right">delete_forever</i>
              </button>
            </div>
            <div>
              <button
                :class="{ ['disabled']: !newDate }"
                class="btn waves-effect waves-light"
                type="submit"
              >
                Обновить
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <table>
            <thead>
              <tr>
                <th>НАЗВАНИЕ</th>
                <th>ЗНАЧЕНИЕ</th>
              </tr>
            </thead>
            <tbody>
              <td>{{ name }}</td>
              <td>
                <checkBox
                  v-if="type == 1"
                  :key="selected_object.id"
                  type="text"
                  v-model="value"
                  :lable="'по умолчанию'"
                  @change="
                    (e) => {
                      value = e;
                    }
                  "
                />

                <TextInput
                  v-if="type == 2"
                  :key="refresh"
                  type="text"
                  :error="'введите ' + name"
                  :errorClass="'invalid'"
                />

                <select_simple
                  v-if="type == 3"
                  :key="selected_object.id"
                  :value="value.split(';')[0]"
                  :options="value.split(';')"
                  @change="
                    (e) => {
                      current = e;
                    }
                  "
                />
              </td>
            </tbody>
          </table>
        </div>
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
    previewMode: {
      default: false,
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
      // let categoryData = {
      //   name: this.name,
      //   // limit: this.limit,
      //   id: this.current,
      // };
      try {
        // await this.$store.dispatch('updateCategorie',categoryData)
        // this.$message(`вы обновили ${this.title}`);
        this.$emit("updatefieldtype", this.selected_object);
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
    name(new_obj) {
      if (this.selected_object.name != new_obj) {
        this.newDate = true;
      }
      this.selected_object.name = new_obj;
    },
    type(new_obj) {
      if (this.selected_object.type != new_obj) {
        this.newDate = true;
      }
      this.selected_object.type = new_obj;
    },
    value(new_obj) {
      if (this.selected_object.value != new_obj) {
        this.newDate = true;
      }
      this.selected_object.value = new_obj;
    },
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
.control_buts div {
  display: inline-block;
  margin: 0 1em 0 0;
}
</style>
