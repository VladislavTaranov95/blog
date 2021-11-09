<template>
  <div class="wrapper">
    <div class="form">
      <p class="form__subtitle">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
      <h2 class="form__title">Login to BlogTitle</h2>
      <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules">
        <el-form-item class="form__item" prop="email">
          <el-input
            v-model="loginForm.email"
            autocomplete="off"
            placeholder="Email"
            class="form__input"
            suffix-icon="el-icon-message"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form__item" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            placeholder="Password"
            class="form__input"
            suffix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form__button">
          <el-button round type="primary" @click="submitForm('loginForm')"
            >SIGN IN</el-button
          >
        </el-form-item>
      </el-form>
      <div class="angle"></div>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import { sendMsg } from "@/helpers/message";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            min: 6,
            max: 24,
            message: "Length should be 6 to 24",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "Length should be 6 to 20",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signIn();
        } else {
          sendMsg("error", "Ivalid form, please check");
          return false;
        }
      });
    },
    signIn() {
      this.$store.dispatch("auth/userLogin", this.loginForm).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          sendMsg("error", error.response.data.error);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex: 1;
  margin: 0 auto;
  align-self: center;
  overflow: hidden;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1;
    &__subtitle {
      font-size: 14px;
      margin-bottom: 30px;
    }

    &__title {
      font-size: 28px;
      margin-bottom: 40px;
    }

    &__input {
      width: 350px;

      &:focus {
        outline: none;
      }
    }

    &__button {
      text-align: center;
      margin-top: 30px;
    }

    .angle {
      position: absolute;
      background-color: white;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
    }
  }

  .background {
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.png");
    width: 100%;
    height: 100%;
  }
}

.icon {
  font-size: 20px;
  margin-right: 5px;
}
</style>
