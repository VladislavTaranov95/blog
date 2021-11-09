<template>
  <div class="wrapper">
    <div class="row-1">
      <img class="image" src="@/assets/home_photo.jpg" alt="" />
      <div class="content">
        <div class="content__title">Welcome!</div>
        <div class="content__description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          debitis iure quibusdam earum numquam error exercitationem, fugiat quas
          esse fugit!
        </div>
        <div class="content__link">
          <a href="#" class="content__link-to">Login/Register</a>
          <a href="#">
            <arrow class="content__link-icon" />
          </a>
        </div>
      </div>
    </div>
    <div class="row-2">
      <div class="content">
        <div class="content__title">Lorem, ipsum.</div>
        <div class="content__description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, quo.
        </div>
      </div>
      <img class="image" src="@/assets/home_photo2.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import arrow from "@/assets/app-icons/arrow_right_icon.svg";

export default {
  name: "Home",
  components: {
    arrow,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #202020;

  .row-1 {
    display: flex;
    justify-content: space-between;
  }

  .row-2 {
    display: flex;
    justify-content: space-between;
  }

  .image {
    width: 1024px;
    height: auto;
  }

  .content {
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__title {
      text-transform: uppercase;
      font-size: 30px;
    }

    &__description {
      width: 300px;
    }

    &__link {
      margin-top: 30px;
      display: flex;

      &-to {
        color: white;
        font-size: 24px;
      }

      a {
        display: flex;
        align-items: center;
        margin-left: 10px;
        color: white;
        transition: 0.3s color ease;
      }

      :hover {
        color: #1eb8b8;
      }
    }
  }
}
</style>
