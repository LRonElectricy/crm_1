<template>
  <div class="app-main-layout">
    <NavBar @toggleside="isOpen = !isOpen" />

    <SideBar :show="isOpen" />

    <main v-if="!loading" class="app-content" :class="{ full: !isOpen }">
      <div class="main-app-content-container">
        <router-view />
      </div>
      
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/records" v-tooltip="'добавить запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/app/SideBar";
import NavBar from "@/components/app/NavBar";
import Messages from "@/utils/messages";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  components: {
    SideBar,
    NavBar,
  },
  async mounted() {
    // if (!Object.keys(this.$store.getters.info).length) {
    //   await this.$store.dispatch("fetchInfo");
    // }
    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(Messages[fbError.code] || " чтото пошло не так");
    },
  }
};
</script>
