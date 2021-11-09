<template>
  <div class="profile">
    <div class="container">
      <div class="profile-info">
        <p class="title">Account Settings</p>
        <div class="profile">
          <div v-if="!userAvatar" class="initials">{{ userInitial }}</div>
          <div
            v-else
            class="initials"
            :style="{
              backgroundImage: 'url(' + userAvatar + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              width: '200px',
              height: '200px',
            }"
          ></div>
          <label for="file-upload" class="custom-file-upload">
            <el-icon>
              <upload-filled></upload-filled>
            </el-icon>
            Upload image
          </label>
          <input id="file-upload" type="file" @change="selectedFile($event)" />
          <el-form
            ref="profileModel"
            :model="profileModel"
            status-icon
            :rules="rules"
            class="profile-form"
          >
            <el-form-item class="profile-item" prop="email">
              <p>Email:</p>
              <el-input
                class="profile-input"
                v-model="profileModel.email"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item class="profile-item" prop="name">
              <p>Name:</p>
              <el-input
                class="profile-input"
                v-model="profileModel.name"
              ></el-input>
            </el-form-item>
            <el-form-item class="profile-item" prop="profession">
              <p>Profession:</p>
              <el-input
                class="profile-input"
                v-model="profileModel.profession"
              ></el-input>
            </el-form-item>
            <el-form-item class="profile-item" prop="skills">
              <p>Skills:</p>
              <div v-if="profileModel.skills.length">
                <el-tag
                  v-for="tag in profileModel.skills"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="deleteTag(tag)"
                >
                  {{ tag }}
                </el-tag>
              </div>
              <div v-else>
                <div>None</div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="selectTag"
                size="mini"
                v-for="tag in skillTags"
                :key="tag"
              >
                {{ tag }}
              </el-button>
            </el-form-item>
            <el-form-item>
              <div class="form-footer">
                <el-button
                  class="profile-btn-save"
                  round
                  @click="submitForm('profileModel')"
                  >Save changes</el-button
                >
                <p>Registration date: {{ regDate }}</p>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sendMsg } from "@/helpers/message";
import { UploadFilled } from "@element-plus/icons";

export default {
  name: "UserProfile",
  components: {
    UploadFilled,
  },
  data() {
    return {
      profileModel: {
        name: "",
        email: "",
        proffesion: "",
        skills: [],
      },
      regDate: "",
      skillTags: [
        "JavaScript",
        "Vue",
        "React",
        "Angular",
        "Node.js",
        "Express",
        "Python",
        "Django",
        "Git",
        "HTML",
        "CSS",
        "SCSS",
        "SASS",
        "LESS",
        "Electron",
      ],
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 5,
            max: 10,
            message: "Length should be 5 to 10",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      userInitial: "auth/getUserInitials",
      userName: "auth/getUserName",
      userEmail: "auth/getUserEmail",
      userSkills: "auth/getUserSkills",
      userId: "auth/getUserId",
      userProfession: "auth/getUserProfession",
      userRegDate: "auth/getUserRegDate",
      userAvatar: "auth/getUserAvatar",
    }),
    getSkills() {
      if (this.userSkills) {
        return this.userSkills.split(",");
      }
      return false;
    },
  },
  methods: {
    selectTag(event) {
      this.profileModel.skills.push(event.target.innerText);
      this.skillTags = this.skillTags.filter(
        (tag) => tag !== event.target.innerText
      );
    },
    deleteTag(deletedTag) {
      this.profileModel.skills = this.profileModel.skills.filter(
        (tag) => tag !== deletedTag
      );
      this.skillTags.push(deletedTag);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveUserProfile();
        } else {
          sendMsg("error", "Error! Please check your values...");
          return false;
        }
      });
    },
    saveUserProfile() {
      this.$store
        .dispatch("auth/saveProfile", {
          id: this.userId,
          name: this.profileModel.name,
          profession: this.profileModel.profession,
          skills: this.profileModel.skills.join(),
        })
        .then(
          () => {
            this.$router.push("/profile");
            sendMsg("success", "Profile saved and updated!");
          },
          (error) => {
            sendMsg("error", error.response.data.error);
          }
        );
    },
    async selectedFile(event) {
      console.log(1);
      const formData = new FormData();
      formData.append("avatar", event.target.files[0]);
      try {
        await this.$store.dispatch("auth/editUserPhoto", formData);
      } catch (e) {
        sendMsg("error", e.response.data.error.message);
      }
    },
  },
  mounted() {
    this.profileModel.name = this.userName;
    this.profileModel.email = this.userEmail;
    this.profileModel.profession = this.userProfession;
    this.regDate = new Date(this.userRegDate).toLocaleString();

    //get user skills
    if (this.getSkills) {
      this.profileModel.skills = [...this.getSkills];
    }

    //edit default array of skills
    this.skillTags = this.skillTags.filter((el) => {
      return this.profileModel.skills.indexOf(el) === -1;
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 50px 0px;

  .profile-info {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 36px;
      font-weight: 300;
    }

    .profile {
      margin-top: 30px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      background-color: #f1f1f1;
      border-radius: 10px;
      padding: 0px 20px;

      input[type="file"] {
        display: none;
      }
      .custom-file-upload {
        margin-top: 30px;
        border: 1px solid #ccc;
        display: inline-block;
        padding: 10px 12px;
        cursor: pointer;
        border-radius: 20px;

        &:hover {
          opacity: 0.7;
        }
      }

      .initials {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 42px;
        font-weight: 600;
        background-color: #303030;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        color: #fff;

        img {
          width: 100%;
          height: auto;
        }
      }

      .profile-form {
        margin-top: 30px;
        width: 100%;

        .profile-item {
          margin-bottom: 10px;
        }

        .el-tag {
          margin-right: 10px;
        }

        .el-form-item__content {
          display: flex;
          justify-content: center;
          .profile-btn-save {
            background-color: #303030;
            color: #fff;

            :hover {
              opacity: 0.7;
            }
          }
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
