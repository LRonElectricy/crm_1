<template>
  <div>
    <div class="page-title">
      <h3>Создать продукт</h3>
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
                :fields="AllCartFields"
                :key="refresh"
                :firstSelected="current"
                @updatecategorie="updateCategorie"
                @addFieldToCard="addFieldToCard"
                @deletItem="deletItem"
              />

              <p class="center" v-else>Добавти категорию</p>
              <div class="divider col s12"></div>
            </div>
            <div class="col s6">
              <createNewProduct
                :fields="
                  AllCardTypesToFields.filter((c) => c.card_types === current)
                "
              />
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
// import CardFieldPeview from "@/components/cardFields/CardFieldPeview";
import createNewProduct from "@/components/Products/createNewProduct";

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
    // CardFieldPeview,
    createNewProduct,
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
          mutation.type === "setAllCardTypes" ||
          mutation.type === "setCardTypesToFields"
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
    async addFieldToCard(newConn) {
      let existingField = this.AllCardTypesToFields.filter(
        (c) => c.card_types === this.current
      ).find((f) => f.field_types === newConn.field);
      //if new
      if (!existingField) {
        this.$message(
          `добавляем поле "${
            this.AllCartFields.find((f) => f.id === newConn.field).name
          }" в карточку "${
            this.AllCardTypes.find((c) => c.id === newConn.card).name
          }"`
        );
        this.loading = true;
        await this.$store.dispatch("addCardTypeToField", newConn);
        this.loading = false;
        this.current = newConn.card;
      } else {
        this.$message(
          `поле "${
            this.AllCartFields.find((f) => f.id === newConn.field).name
          }" уже существует`
        );
      }
    },
    async addCategory(categoryData) {
      console.log("creating cat ");
      this.$message(`${categoryData} создан!`);
      await this.$store.dispatch("addCardType", categoryData);
    },
    async deletItem(item) {
      let current_tmp = this.current;
      let itemID = this.AllCardTypesToFields.find(
        (a) => a.field_types === item.id
      ).id;
      this.$message(`${item.name} удален! id:${itemID}`);
      this.loading = true;
      await this.$store.dispatch("deletCardTypeToField", { id: itemID });
      this.loading = false;
      this.current = current_tmp;
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
