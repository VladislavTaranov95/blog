<template>
  <div id="app">
    <div class="app-wrapper">
      <app-navigation v-if="!navigation"></app-navigation>
      <router-view />
      <app-footer v-if="!navigation"></app-footer>
    </div>
  </div>
</template>

<script>
//import BaseNav from "@/components/BaseNav";
//import BaseRouterLink from "@/components/BaseRouterLink";
import AppNavigation from "@/components/AppNavigation";
import AppFooter from "@/components/AppFooter";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    AppNavigation,
    AppFooter,
  },
  data() {
    return {
      navigation: null,
    };
  },
  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  computed: {
    ...mapGetters({
      logStatus: "auth/getUserLogStatus",
      userName: "auth/getUserName",
      userAvatar: "auth/getUserAvatar",
    }),
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
  created() {
    this.checkRoute();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.wrapper {
  width: 100%;
}

.link {
  text-decoration: none;
  color: black;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
