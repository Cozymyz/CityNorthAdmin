<template>
  <div class="login-container">
    <div class="title tologin">
      <span>管理员登录</span></div>
    <el-form
      ref="adminloginForm"
      v-loading="loading"
      :model="adminloginForm"
      class="adminlogin-form"
      label-position="left"
    >
      <el-form-item prop="login_adminname">
        <i class="el-icon-user-solid svg-container" />
        <el-input
          ref="login_adminname"
          v-model="adminloginForm.login_adminname"
          type="text"
          name="login_adminname"
          auto-complete="true"
          placeholder="账号"
          tabindex="1"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="大写已锁定" placement="right" manual>
        <el-form-item prop="login_password">
          <i class="el-icon-lock svg-container" />
          <el-input
            :key="passwordType"
            ref="login_password"
            v-model="adminloginForm.login_password"
            :type="passwordType"
            tabindex="2"
            name="login_password"
            auto-complete="on"
            placeholder="密码"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;
        margin-bottom:30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminLoginForm',
  data() {
    return {
      title: '管理员登录',
      capsTooltip: false,
      checked: true,
      adminloginForm: {
        login_adminname: '',
        login_password: ''
      },
      loading: false,
      passwordType: 'password'
      // redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin: function() {
      console.log(this.login_adminname, this.password)
      this.$refs.adminloginForm.validate(valid => {
        this.loading = true
        if (valid) {
          this.$store.dispatch('admin/adminlogin', this.adminloginForm).then(() => {
            console.log('error')
            this.$router.push({ path: '/admin' })
            this.loading = false
          }, (data) => {
            this.$message.error({
              message: '账号或密码错误'
            })
            this.loading = false
          }
          ).catch(function(error) {
            console.log(error)
          })
        } else {
          console.log('error login!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
// $light_gray:#fff;
// $cursor:#f40;
// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }
.login-container{
  .el-input{
    display: inline-block;
    height: 47px;
    width: 90%;

    input{
      background: transparent;
      // border: 0px;
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      height: 47px;

    }
  }
  .el-form-item{
    border: 1px solid rgba(255,255,255,0.1);
    // background: rgba(0,0,0,0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>
<style lang="scss" scoped>
$dark_gray:#889aa4;
  .login-container{
    // min-height: 100%;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 0px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;
    .title{
      margin: 0px auto 0px auto;
      text-align: center;
      color: #505458;
      cursor: pointer;
      font-size: 20px;
      position: relative;
      bottom: 15px;
      color: #0078F7;
      //float: left;
      //left: 60px;
    }
    }
    .adminlogin-form{
      position: relative;
      // width: 350px;
      width: 100%;
      // padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .svg-container{
      padding: 6px 10px 6px 0px;
      font-size: 16px;
      margin-left: -5px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
  </style>
