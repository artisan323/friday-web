<template>
  <div class="login_container" :style="{backgroundImage:`url(${img})`}">
    <div class="login_box">
      <div class="avater_box">
        <img src="../../assets/tx.png" alt="">
      </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-apple"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-grape"></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: require('../../assets/images/backgroud.jpg'),
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单校验规则
      loginFormRules: {
        userName: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符之间', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 6 个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
    },
    returnMessageError(data, errorMessage) {
      if (data.meta.status !== 200) {
        return this.$message.error(errorMessage)
      }
    },
    login (){
      this.$refs.loginFormRef.validate( valid => {
        if (!valid) {
          return
        }
        this.$router.push('/home')
        this.$http.post('/admin/login', this.loginForm).then(res => {
          this.returnMessageError(res.data, '登陆失败')
          this.$message({
            message: '登陆成功!',
            type: 'success'
          })
          console.log(res.data.data.token)
          window.sessionStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avater_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position:  absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
}
.btns{
  display: flex;
  justify-content: center;
}
.login_form{
  position: absolute;
  bottom: 25px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
