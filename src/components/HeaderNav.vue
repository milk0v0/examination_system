<template>
  <div class="header-nav">
    <div class="left">
      <div class="btn" v-if="backBtnBol" @click="handleBack">返回</div>
    </div>
    <div class="right">
      <div class="btn" v-if="userBtnBol" @click="jumpUserInfo">个人信息</div>
      <div class="btn logout" v-if="logoutBtnBol" @click="handleLogout">退出</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 返回按钮 显示/隐藏
    backBtnBol: {
      type: Boolean,
      default: true
    },

    // 个人信息按钮 显示/隐藏
    userBtnBol: {
      type: Boolean,
      default: true
    },

    // 退出登录按钮 显示/隐藏
    logoutBtnBol: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    // 返回
    handleBack() {
      this.$router.back(-1);
    },

    // 跳转个人信息
    jumpUserInfo() {
      this.$router.push('/userInfo')
    },

    handleLogout() {
      localStorage.setItem('token', '')
      localStorage.setItem('phone', '')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
  width: 100%;
  box-sizing: border-box;
  padding: .3rem .3rem;
  font-size: .5rem;
  display: flex;
  justify-content: space-between;
}

.header-nav .right {
  display: flex;  
}

.header-nav .btn {
  padding: .1rem .3rem;
  border: 1px solid #c3c3c3;
  border-radius: .15rem;
}
.header-nav .btn.logout {
  margin-left: .2rem;
}
</style>