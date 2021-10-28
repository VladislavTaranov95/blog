<template>
  <div id="app">
    <div class="wrapper">
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
    </div>
  </div>
</template>

<script>
import BaseNav from "@/components/BaseNav";
import BaseRouterLink from "@/components/BaseRouterLink";

export default {
  name: "App",
  components: {
    BaseNav,
    BaseRouterLink,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper {
  width: 800px;
  margin: 0 auto;
}

.nav-header {
  &__items {
    &-right {
      display: flex;
    }
  }
}

.profile {
  display: flex;

  &__title {
    cursor: pointer;
    color: black;
  }

  &__username {
    padding: 8px 16px;
  }

  &__menu {
    text-align: center;

    &-btn-profile {
      margin-top: 20px;
    }
  }

  &__avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & input {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
