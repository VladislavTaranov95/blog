<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header-link" to="/">BlogTitle</router-link>
      </div>
      <div class="nav-links">
        <ul>
          <router-link class="link" to="/">Home</router-link>
          <router-link class="link" to="/posts">Blogs</router-link>
          <router-link class="link" to="/">Create Post</router-link>
          <router-link v-if="!userLogStatus" class="link" to="/login">
            Login/Register
          </router-link>
        </ul>
        <div v-if="userLogStatus" class="profile" ref="profile">
          <div class="link-initial" @click="profileStatus">
            {{ userInitial }}
          </div>
          <div class="profile-menu" v-if="profileShow">
            <div class="menu-info">
              <p class="initials">{{ userInitial }}</p>
              <div class="right">
                <div class="name">{{ userName }}</div>
                <div class="email">{{ userEmail }}</div>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <el-icon :size="20" class="option-icon">
                  <user />
                </el-icon>
                <router-link to="/profile">Profile</router-link>
              </div>
              <div class="option signout" @click="signOut">
                <el-icon :size="20" class="option-icon">
                  <right />
                </el-icon>
                Sign Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { User, Right } from "@element-plus/icons";

export default {
  components: {
    User,
    Right,
  },
  data() {
    return {
      profileShow: false,
    };
  },
  methods: {
    profileStatus() {
      this.profileShow = !this.profileShow;
    },
    signOut() {
      this.$store.dispatch("auth/userLogout");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({
      userLogStatus: "auth/getUserLogStatus",
      userEmail: "auth/getUserEmail",
      userInitial: "auth/getUserInitials",
      userName: "auth/getUserName",
    }),
  },
};
</script>

<style lang="scss" scoped>
header {
  background: white;
  padding: 0px 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header-link {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .profile {
        position: relative;

        .link-initial {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background-color: #303030;
          color: #fff;
          border-radius: 50%;
          font-size: 24px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.5s ease;

          &:hover {
            opacity: 0.8;
          }
        }

        &-menu {
          position: absolute;
          width: 250px;
          transition: 0.5s ease;
          top: 60px;
          right: 0;
          background-color: #fff;
          box-shadow: 0px 0px 25px 0px rgba(34, 60, 80, 0.5);

          .menu-info {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 15px 10px;
            border-bottom: 1px solid #303030;

            .initials {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #303030;
              color: #fff;
              font-size: 24px;
              font-weight: 600;
            }

            .right {
              .name {
                font-size: 20px;
              }

              .email {
                font-size: 16px;
              }
            }
          }

          .options {
            padding: 10px 10px;

            .option {
              padding: 0 50px;
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              transition: 0.3s color ease;

              &-icon {
                margin-right: 20px;
              }

              a {
                text-decoration: none;
                color: black;
                transition: 0.3s color ease;

                &:hover {
                  color: #1eb8b8;
                }
              }

              &:hover {
                cursor: pointer;
                color: #1eb8b8;
              }
            }
          }
        }
      }
    }
  }
}
</style>
