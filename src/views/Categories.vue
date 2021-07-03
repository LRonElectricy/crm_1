<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row" v-if="!loading">
        <AddCategory @addcategory="addCategory" />
        <EditCategory
        v-if="categories.length"
          :categories="categories"
          :key="categories.length + categoriesCounter"
          @updatecategorie="updateCategorie"
        />
        <p class="center" v-else>Добавти категорию</p>
      </div>
      <Preloader v-else />
    </section>
  </div>
</template>

<script>
import AddCategory from "@/components/categories/AddCategory";
import EditCategory from "@/components/categories/EditCategory";
export default {
  data: () => ({
    categories: [],
    loading: false,
    categoriesCounter: 0,
  }),
  components: {
    AddCategory,
    EditCategory,
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("getCategories");
      this.loading = false;
      // console.log(this.categories);
    } catch (error) {}
  },
  methods: {
    addCategory(newCat) {
      console.log(newCat);
      this.categories.push(newCat);
    },
    updateCategorie(categoryData){
      console.log("updating cats");
      let index = this.categories.findIndex(c=>c.id===categoryData.id)
      this.categories[index].id = categoryData.id;
      this.categories[index].title = categoryData.title;
      this.categories[index].limit = categoryData.limit;
      this.categoriesCounter++;
    }
  },
};
</script>
