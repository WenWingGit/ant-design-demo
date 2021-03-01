<template>
  <div class="login-page">
    <div class="login-box">
      <h2>登录</h2>

      <a-form-model
        class="login-form"
        :model="form_login"
        :rules="rules"
        @submit="handleSubmit"
        @submit.native.prevent
      >
        <a-form-model-item>
          <a-input
            placeholder="用户名"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            type="password"
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
          <a class="login-form-forgot" >忘记密码</a>
          <a-button type="primary" html-type="submit" block>
            登录
          </a-button>
          <div>
            还没账号
            <a href=""> 立即注册 </a>
          </div>
        </a-form-model-item>
      </a-form-model>

      <!-- <a-form-model
        
      >
        <a-form-model-item>
          <a-input v-model="form_login.user" placeholder="用户名">
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="form_login.password"
            type="password"
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
          <a-button
            block
            type="primary"
          >
            登录
          </a-button>
        </a-form-model-item>
      </a-form-model> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form_login: {
        user: "",
        password: "",
      },
      rules: {
        username: [
          { whitespace: true, message: '请输入用户名' },
          { required: true, message: '请输入用户名' },
        ]
      }
    };
  },
  methods: {
    handleSubmit() {},
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
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 400px;
  width: 90%;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #dee1e6;
  box-sizing: border-box;
  box-shadow: 0 15px 25px #f1f3f4;
  border-radius: 4px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #40a9ff;
  text-align: center;
}

.login-form {
  max-width: 300px;
}
.login-form-forgot {
  float: right;
}
</style>