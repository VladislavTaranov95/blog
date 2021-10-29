<template>
  <div class="base-router-link">
    <router-link :class="className" :to="routeTo">
      <component
        :is="icon"
        class="nav-header-link-icon"
        :component="icon"
        :class="iconClasses"
      ></component>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    routeTo: {
      type: String,
      default: "",
    },
    navHeaderLink: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Object,
      default: () => {},
    },
    blogNavLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        "nav-header-link": this.navHeaderLink,
      };
    },
    iconClasses() {
      return {
        "nav-header-link-icon-active": this.blogNavLink,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-header-link {
  text-decoration: none;
  color: white;
  margin-right: 10px;

  &-icon {
    font-size: 32px;
    color: #575f8a;
    &-active {
      color: white;
      font-size: 36px;
    }
  }
}
</style>
