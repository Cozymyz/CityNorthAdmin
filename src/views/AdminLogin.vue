<template>
  <div class="login">
    <div class="content">
      <img src="../assets/background.jpg" alt="" class="bgpic">
      <admin-login-form class="form" />
    </div>
    <footer-line />
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
    .login{
        /* width: 1590px; */
        width:100%;
        min-height: 100%;
        height: 100%;
        position: relative;
    }
    .content{
        padding-bottom: 30px;
    }
    .bgpic{
        height: 100%;
        width: 100%;
    }
    .form{
        position: absolute;
        /* right: 200px; */
        right: 20%;
        transform: translate(50%,0);
        /* top: 183px; */
        top: 25%;
    }
</style>
