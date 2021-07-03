<template>
  <div>
    <div class="page-title">
      <h3>Типы карточек</h3>
    </div>
    <section>
      <div class="row" v-if="!loading">
        <AddCardType @addcategory="addCategory" />
        <EditCardTypes
          v-if="AllCardTypes.length"
          :categories="AllCardTypes"
          :key="refresh"
          @updatecategorie="updateCategorie"
          @deletItem="deletItem"
        />
        <p class="center" v-else>Добавти категорию</p>
      </div>
      <Preloader v-else />
    </section>
  </div>
</template>

<script>
import EditCardTypes from "@/components/cardTypes/EditCardTypes";
import AddCardType from "@/components/cardTypes/AddCardType";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loading: true,
    refresh: false,
  }),
  components: {
    EditCardTypes,
    AddCardType,
  },
  computed: {
    ...mapGetters(["AllCardTypes"]),
  },
  async mounted() {
    try {
      console.log("mounted()...");
      await this.$store.dispatch("getAllCardTypes");
      this.loading = false;

      this.$store.subscribe((mutation, state) => {
        if (mutation.type === "updateCardType" || mutation.type ===  'setAllCardTypes') {
          console.log("see mutation in updateCardType");
          this.refresh = !this.refresh;
        }
      });
    } catch (error) {}
  },
  methods: {
    async updateCategorie(categoryData) {
      this.loading = true;
      console.log("updating cats");
      await this.$store.dispatch("updateCardType", {
        id: categoryData.id,
        name: categoryData.name,
      });
      await this.$store.dispatch("getAllCardTypes");
      this.loading = false;
    },
    async addCategory(categoryData) {
      console.log("creating cat ");
      this.$message(`${categoryData} создан!`);
      await this.$store.dispatch("addCardType",categoryData);
    },
    async deletItem(item){
      await this.$store.dispatch("deletCardType",item);
      this.$message(`${item.name} удален!`);
    }
  },
};
</script>
