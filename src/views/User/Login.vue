<template>
  <div class="login-page flex a-c j-c">
    <div class="login-box animate__animated animate__fadeInRight">
      <h2>登录</h2>

      <a-form-model
        class="login-form"
        ref="login_form"
        :model="form_login"
        :rules="rules"
        @submit.native.prevent
      >
        <a-form-model-item prop="username">
          <a-input
            placeholder="用户名"
            v-model.trim="form_login.username"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input
            type="password"
            v-model.trim="form_login.password"
            placeholder="密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-checkbox>
            24小时内免登陆
          </a-checkbox>
          <router-link class="login-form-forgot" to="/forget-pwd">忘记密码</router-link>
          <a-button type="primary" block @click="handleLoginSubmit()">登录</a-button>
          <div>
            还没账号
            <router-link to="/register">立即注册</router-link>
          </div>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "Login",
  data() {
    return {
      form_login: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { whitespace: true, message: '请输入用户名' },
          { required: true, message: '请输入用户名' },
        ],
        password: [
          { whitespace: true, message: '请输入密码' },
          { required: true, message: '请输入密码' },
        ]
      }
    };
  },
  methods: {
    async handleLoginSubmit() {
      await this.$valid('login_form')
      if(this.form_login.username === '123' && this.form_login.password === '123') {
        this.$router.push('/')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: $blue;
}
.login-box {
  max-width: 400px;
  width: 90%;
  padding: 40px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 3px 10px #fff;
  border-radius: 4px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: $blue;
  font-weight: bold;
  letter-spacing: 4px;
  text-align: center;
}

.login-form {
  max-width: 300px;
}
.login-form-forgot {
  float: right;
}
</style>