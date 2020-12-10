<template>
  <div id="login">
    <img src="static/cheerup.png" class="responsive-img" />
    <div class="container" style="text-align: left">
      <div class="form-signin">
        <div class="row">
          <div class="slideThree pull-right" style="left: 50%">
            <input
              type="checkbox"
              v-model="lang"
              :true-value="'tw'"
              :false-value="'en'"
              @change="setLang(lang)"
              id="slideThree"
            />
            <label for="slideThree"></label>
          </div>
        </div>
        <button
          id="signout"
          v-if="auth"
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          @click="logout"
        >
          {{ $t("Sign_out") }}
        </button>
        <div v-if="!auth">
          <h2 class="form-signin-heading">{{ $t("Please_sign_in") }}</h2>
          <label for="email" class="sr-only">Email address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            :placeholder="$t('Email_address')"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            v-model="password"
            v-toggle-password="togglePassword"
            @keyup.enter="login"
            type="password"
            id="inputPassword"
            class="form-control"
            :placeholder="$t('Password')"
            required
          />
          <!-- 1. check box 雙向綁定[布林] -->
          <div class="squaredFour" style="margin: 20px 10px">
            <input
              type="checkbox"
              v-model="togglePassword"
              id="togglePassword"
            />
            <label for="togglePassword" class="checkbox-icon"></label>
            <label for="togglePassword">{{ $t("Show_password") }}</label>
          </div>
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            @click="login"
          >
            {{ $t("Sign_in") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      togglePassword: false,
      lang: "en",
    };
  },
  methods: {
    // 因為 action 包裝了 Promise 所以可以使用 then 和 catch 來接收非同步回傳狀態
    login() {
      this.$store
        .dispatch("actionLogin", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          // 使用 $router.push 轉跳到 hello Page
          console.log("3. get Promise resolve");
          setTimeout(() => {
            //this.$router.push("/hello");
            this.$swal({
              icon: "success",
              title: "登入成功",
            });
          }, 1000);
        })
        .catch(() => {
          console.log("error get Promise reject!");
          this.$swal({
            icon: "error",
            title: "帳密有誤",
          });
        });
    },
    logout() {
      this.$store.dispatch("actionLogout");
      this.$swal({
        icon: "info",
        title: "登出成功",
      });
    },
    setLang(value) {
      // 要改變語系預設必需給值給locale
      this.$i18n.locale = value;
    },
  },
  computed: mapGetters({
    auth: "getLogin",
  }),
  created() {
    // 在 vue 調用 router
    console.log("vue created:", this.$route.matched[0]);
  },
};
</script>

<style lang="scss">
.responsive-img {
  width: 100%;
}
#login {
  padding-bottom: 40px;
}
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
#signout {
  margin-top: 30%;
}
/* switch */
$switch-width: 160px;
$switch-labal-width: 80px;
$switch-background: #a4daff;
$switch-font-color: #333;
.slideThree {
  width: $switch-width;
  height: 26px;
  background: $switch-background;
  position: relative;
  border-radius: 50px;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
    0px 1px 0px rgba(255, 255, 255, 0.2);
  &:after {
    content: "English";
    color: $switch-font-color;
    position: absolute;
    right: 12px;
    z-index: 0;
    font-size: 12px;
    line-height: 26px;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.15);
  }
  &:before {
    content: "繁體";
    color: $switch-font-color;
    position: absolute;
    left: 24px;
    z-index: 0;
    font-size: 12px;
    line-height: 26px;
  }
  label {
    display: block;
    width: $switch-labal-width;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 3px;
    left: 3px;
    z-index: 1;
    background: #fcfff4;
    background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
    border-radius: 50px;
    transition: all 0.4s ease;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }
  input[type="checkbox"] {
    visibility: hidden;
    &:checked + label {
      left: 78px;
    }
  }
}
</style>