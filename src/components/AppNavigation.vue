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
          <router-link class="link" to="/">Login/Register</router-link>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {};
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
    }
  }
}
</style>
