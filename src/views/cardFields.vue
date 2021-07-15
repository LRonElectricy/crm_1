<template>
  <div>
    <div class="page-title">
      <h3>Типы карточек!!!!</h3>
    </div>
    <section>
      <div class="row" v-if="!loading">
        <transition appear name="fade">
          <div>
            <AddCardFields @addfieldtype="addFieldType" />
            <EditCardFields
              v-if="AllCartFields.length"
              :categories="AllCartFields"
              :firstSelected="AllCartFields[0].id"
              :key="refresh"
              @updatefieldtype="updatefieldtype"
              @deletItem="deletItem"
            />
            <p class="center" v-else>Добавти категорию</p>
          </div>
        </transition>
      </div>
      <Preloader v-else />
    </section>
  </div>
</template>

<script>
import EditCardFields from "@/components/cardFields/EditCardFields";
import AddCardFields from "@/components/cardFields/AddCardFields";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loading: true,
    refresh: false,
  }),
  components: {
    EditCardFields,
    AddCardFields,
  },
  computed: {
    ...mapGetters(["AllCartFields", "AllCartFieldsTypes"]),
  },
  async mounted() {
    try {
      console.log("mounted()...");
      await this.$store.dispatch("getAllFieldTypes");
      this.loading = false;
      console.log(this.AllCartFieldsTypes);
      console.log(this.AllCartFields);

      this.$store.subscribe((mutation, state) => {
        if (
          mutation.type === "setAllCartFields" ||
          mutation.type === "updateCartFields"
        ) {
          console.log("see mutation in setAllCartFields || updateCartFields");
          this.refresh = !this.refresh;
        }
      });
    } catch (error) {}
  },
  methods: {
    async updatefieldtype(Data) {
      this.loading = true;
      console.log("updating field type");
      console.log(Data);
      await this.$store.dispatch("updateCardField", Data);
      await this.$store.dispatch("getAllFieldTypes");
      this.loading = false;
    },
    async addFieldType(categoryData) {
      console.log("addFieldType");
      console.log(categoryData);
      this.$message(`${categoryData} создан!`);
      await this.$store.dispatch("addCardField", categoryData);
    },
    async deletItem(item) {
      await this.$store.dispatch("deletCardField", item);
      this.$message(`${item.name} удален!`);
    },
  },
};
</script>
