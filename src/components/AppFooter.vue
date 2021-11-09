<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" to="/">BlogTitle</router-link>
          <ul>
            <li>
              <a href="#"><youtube class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><twitter class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><instagram class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><linkedin class="svg-icon" /></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" to="#">Home</router-link>
            <router-link class="link" to="#">Blogs</router-link>
            <router-link class="link" to="#">Create Post</router-link>
            <router-link class="link" to="#">Login In / Register</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import youtube from "@/assets/app-icons/youtube_logo_icon.svg";
import twitter from "@/assets/app-icons/twitter_logo_icon.svg";
import instagram from "@/assets/app-icons/instagram_logo_icon.svg";
import linkedin from "@/assets/app-icons/linkedin_logo_icon.svg";

export default {
  name: "AppFooter",
  components: {
    youtube,
    twitter,
    instagram,
    linkedin,
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 50px 25px;
  background-color: #303030;
  .container {
    display: flex;
    flex-direction: row;
    gap: 32px;

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 64px;
      color: white;
      display: flex;
      align-items: center;
    }

    .header {
      font-size: 24px;
      text-decoration: none;
      color: white;
      font-weight: 600;
    }

    ul {
      gap: 16px;
      list-style: none;
      display: flex;
    }

    .col-1,
    .col-2 {
      gap: 32px;
      display: flex;
    }

    .col-1 {
      flex-direction: column;
      align-items: flex-start;

      ul {
        margin-top: auto;

        li {
          display: flex;
          align-items: center;

          .svg-icon {
            width: 32px;
            height: auto;
          }
        }
      }
    }

    .col-2 {
      ul {
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        .link {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
        }
      }
    }
    .right {
      grap: 32px;
      color: #fff;
      align-items: flex-end;
      flex-direction: column;
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
