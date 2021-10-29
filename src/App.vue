<template>
  <div id="app">
    <div class="wrapper">
      <blog-nav></blog-nav>
      <div class="container">
        <div class="content"><router-view></router-view></div>
      </div>
    </div>
    <!-- <div class="wrapper">
      <base-nav :navHeader="true">
        <div>
          <base-router-link
            :navHeaderLink="true"
            :route="{ navTo: '/', name: 'Home' }"
          ></base-router-link>
        </div>
        <div v-if="!logStatus" class="nav-header__items-right">
          <base-router-link
            :navHeaderLink="true"
            :route="{ navTo: '/login', name: 'Sign In' }"
          ></base-router-link>
          <base-router-link
            :navHeaderLink="true"
            :route="{ navTo: '/register', name: 'Sign Up' }"
          >
          </base-router-link>
        </div>
        <div v-else class="profile">
          <div class="profile__username">
            <el-dropdown trigger="click">
              <span class="profile__title">
                Welcome, {{ userName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu class="profile__menu">
                  <el-dropdown-item>
                    <div class="profile__avatar">
                      <img
                        v-if="userAvatar"
                        :src="userAvatar"
                        style="width: 100px; height: 100px"
                      />
                      <input
                        type="file"
                        name="import_file"
                        v-on:change="selectedFile($event)"
                      />
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item class="profile__menu-btn-profile">
                    <base-router-link
                      :navHeaderLink="true"
                      :route="{ navTo: '/profile', name: 'Your profile' }"
                      >Your profile</base-router-link
                    >
                  </el-dropdown-item>
                  <el-dropdown-item command="logOut" divided
                    >Sign Out</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </base-nav>
      <router-view></router-view>
    </div> -->
  </div>
</template>

<script>
//import BaseNav from "@/components/BaseNav";
//import BaseRouterLink from "@/components/BaseRouterLink";
import BlogNav from "@/components/BlogNav";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    BlogNav,
    //BaseNav,
    //BaseRouterLink,
  },
  computed: {
    ...mapGetters({
      logStatus: "auth/getUserLogStatus",
      userName: "auth/getUserName",
      userAvatar: "auth/getUserAvatar",
    }),
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #333852;
}
.wrapper {
  display: flex;
}

.container {
  width: 100%;
  border-radius: 10px 0 0 10px;
  background: white;
  display: flex;
}

.content {
  width: 100%;
  text-align: center;
}
</style>
