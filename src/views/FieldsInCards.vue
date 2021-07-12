<template>
  <div>
    <div class="page-title">
      <h3>Типы карточек</h3>
    </div>
    <section>
      <div class="row" v-if="!loading">
        <transition appear name="fade">
          <div>
            <div class="col s6">
              <addFieldToCard
                @selectcard="selectCard"
                v-if="AllCardTypes.length"
                :categories="AllCardTypes"
                :key="refresh"
                @updatecategorie="updateCategorie"
                @deletItem="deletItem"
              />

              <p class="center" v-else>Добавти категорию</p>
              <div class="divider col s12"></div>
            </div>
            <div class="col s6">
              <div
                v-for="Type in AllCardTypesToFields.filter(
                  (c) => c.card_types === current
                )"
                :key="Type.id"
              >
                <CardFieldPeview
                  :oneCategoty="
                    AllCartFields.find((field) => field.id === Type.field_types)
                  "
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
      <Preloader v-else />
    </section>
  </div>
</template>

<script>
import addFieldToCard from "@/components/fieldsInCards/addFieldToCard";
import CardFieldPeview from "@/components/cardFields/CardFieldPeview";

// import AddCardType from "@/components/cardTypes/AddCardType";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loading: true,
    refresh: false,
    current: null,
  }),
  components: {
    addFieldToCard,
    CardFieldPeview,
    // AddCardType,
  },
  computed: {
    ...mapGetters([
      "AllCardTypes",
      "AllCartFields",
      "AllCartFieldsTypes",
      "AllCardTypesToFields",
    ]),
  },
  async mounted() {
    try {
      console.log("mounted()...");
      await this.$store.dispatch("getAllCardTypes");
      await this.$store.dispatch("getAllFieldTypes");
      await this.$store.dispatch("AllCardTypesToFields");
      this.loading = false;

      this.$store.subscribe((mutation, state) => {
        if (
          mutation.type === "updateCardType" ||
          mutation.type === "setAllCardTypes"
        ) {
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
      await this.$store.dispatch("addCardType", categoryData);
    },
    async deletItem(item) {
      await this.$store.dispatch("deletCardType", item);
      this.$message(`${item.name} удален!`);
    },
    selectCard(selectedCadrID) {
      this.current = selectedCadrID;
    },
  },
  watch: {
    current() {
      console.log("paret see selected:" + this.current);
    },
  },
};
</script>
