<template>
  <div class="container" :class="turnClass">
    <div class="form-container register-container">
      <el-form action="#">
        <h1>注册</h1>
        <el-form-item>
          <input type="text" placeholder="请输入用户名">
        </el-form-item>
        <el-form-item>
          <input type="email" placeholder="请输入邮箱">
        </el-form-item>
        <el-form-item>
          <input type="password" placeholder="请输入密码">
        </el-form-item>
        <el-form-item>
          <input type="password" placeholder="请再次确认密码">
        </el-form-item>
        <a href="#">忘记密码？</a>
        <el-button @click="">注册</el-button>
      </el-form>
    </div>

    <div class="form-container login-container">
      <el-form>
        <h1>登录</h1>
        <el-form-item>
          <input type="text" placeholder="请输入用户名" v-model="loginForm.username">
        </el-form-item>
        <el-form-item>
          <input type="password" placeholder="请输入密码" v-model="loginForm.password">
        </el-form-item>
        <a href="#">忘记密码？</a>
        <el-button @click="handleSubmit">登录</el-button>
      </el-form>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>没有账号?</h1>
          <p>立即注册加入我们，和我们一起开始旅程吧</p>
          <button id="register" @click="handleRegister">注册</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>已有账号？</h1>
          <p>请使用您的账号进行登录</p>
          <button id="login" @click="handleLogin">登录</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    let turnClass = ref('right-panel-active')
    const loginForm = reactive({
      username: '',
      password: ''
    })

    // 点击去登录
    let handleSubmit = () => {
      proxy.$api.getMenu(loginForm).then((res) => {
        if (res && res.code == 200) {
          ElMessage({
            type: 'success',
            message: '登录成功！',
          })
          store.commit('UPDATE_MENU', res.data.menu)
          store.commit('LOCAL_MENU', router)
          router.push('/home')
        } else {
          ElMessage({
            type: 'error',
            message: '账号或密码错误',
          })
        }
      })
    }

    // 点击去注册按钮时
    let handleRegister = () => {
      turnClass.value = ''
    }
    // 点击去登录按钮时
    let handleLogin = () => {
      turnClass.value = 'right-panel-active'
    }

    return {
      proxy,
      turnClass,
      loginForm,
      handleRegister,
      handleLogin,
      handleSubmit
    }
  },

  // 组件内路由进入组件时
  beforeRouteEnter(to, from, next) {
    window.document.body.style.background = '#4d4d59 no-repeat'
    next()
  },

  // 组件内路由离开组件时
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = ''
    next()
  }

}
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 0;
}

a {
  text-decoration: none;
  color: black;
  font-size: 14px;
  margin: 15px 0;
  transform: translateX(40%);
}

p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
  color: #adadad;
}

button {
  border: 1px solid #333;
  border-radius: 20px;
  height: 35px;
  cursor: pointer;
  letter-spacing: 1px;
  font-size: 15px;
  background: transparent;
  color: #333;
}

// 大框架
.container {
  width: 765px;
  height: 480px;
  background-color: #fff;
  border-radius: 10px;
  margin: 60px auto;
  box-shadow: 14px 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  position: relative;
  overflow: hidden;
}

/* 表单框架 */
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: transform 0.6s ease-in-out;
}

.form-container form {
  background: #fff;
  height: 100%;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.register-container {
  width: 50%;
  left: 0;
  z-index: 2;
  transition: 0.3s;
}

.login-container {
  width: 50%;
  left: 0;
  z-index: 1;
  opacity: 0;
  transition: 0.5s;
}

/* 输入框 */
input {
  color: #333;
  width: 100%;
  height: 35px;
  margin: 10px 0;
  border: 0;
  outline: none;
  border-bottom: 1px solid #adadad;
  font-size: 13px;
}


/* 按钮 */
.form-container button {
  background-image: linear-gradient(120deg, #f4efb5, #f0cc49);
  background-size: 200%;
  transition: 0.5s;
  color: #fff;
  border: 1px solid #fff;
}


/* 文字提示 */
.overlay-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 100;
  overflow: hidden;
  /* 超出的隐藏 */
  transition: transform 0.6s ease-in-out;
}

.overlay {
  position: relative;
  width: 200%;
  height: 100%;
  left: -100%;
  background-image: linear-gradient(120deg, #f4efb5, #f0cc49);
  background-color: #d2e6f6;
  border-radius: 10px;
  color: #333;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  text-align: center;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

/* 点击后移动 */
.right-panel-active .register-container {
  // z-index: 5;
  opacity: 0;
}

.right-panel-active .login-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.right-panel-active .overlay {
  transform: translateX(50%);
}

.right-panel-active .overlay-left {
  transform: translateY(0);
}

.right-panel-active .overlay-right {
  transform: translateY(20%);
}
</style>