<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleside')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date("datetime") }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="loguot">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    mDropdown: null,
  }),
  methods: {
    async loguot() {
      await this.$store.dispatch("logout");
      // console.log("log out");
      this.$router.push("/login?message=logout");
    },
  },
  mounted() {
    (this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000)),
      // console.log(this.$refs.dropdown);
      (this.mDropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: false,
        coverTrigger: false,
      }));
  },
  computed: {
    name(){
      return this.$store.getters.USER.first_name + ' '+this.$store.getters.USER.last_name;
    } 
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.mDropdown && this.mDropdown.destroy) {
      this.mDropdown.destroy();
    }
  },
};
</script>
