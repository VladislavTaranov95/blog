<template>
  <div class="blog-nav">
    <blog-nav-item class="blog-nav-logo" :mainNav="true">
      <database></database>
    </blog-nav-item>
    <blog-nav-item
      v-for="tab in navTabs"
      :key="tab.id"
      :mainNav="true"
      :active="tab.active"
      @updateTab="selectTab(tab)"
    >
      <base-router-link
        :icon="tab.name"
        :routeTo="tab.routeTo"
        :blogNavLink="tab.active"
      ></base-router-link>
    </blog-nav-item>
  </div>
</template>

<script>
import BlogNavItem from "@/components/BlogNavItem";
import BaseRouterLink from "@/components/BaseRouterLink";

import { Post, AccountMultiple, Cog, Database } from "mdue";
import { shallowRef } from "vue";

export default {
  data() {
    return {
      navTabs: [
        { id: 0, name: shallowRef(Post), active: true, routeTo: "/" },
        {
          id: 1,
          name: shallowRef(AccountMultiple),
          active: false,
          routeTo: "/login",
        },
        { id: 2, name: shallowRef(Cog), active: false, routeTo: "/" },
      ],
      // active: false,
    };
  },
  components: {
    BaseRouterLink,
    BlogNavItem,
    Database,
  },
  methods: {
    selectTab(item) {
      if (!item.active) {
        item.active = !item.active;
        this.navTabs.forEach((tab) => {
          if (tab !== item) {
            return (tab.active = !item.active);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-nav {
  width: 80px;
  height: 100vh;
  background-color: #333852;

  &-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 72px;
    color: #fa1459;
  }
}
</style>
