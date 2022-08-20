<template>
  <div class="header-nav">
    <div class="left">
      <div class="btn" v-if="showTab.backBtnBol" @click="handleBack">返回</div>
    </div>
    <div class="right">
      <div class="btn" v-if="showTab.userBtnBol" @click="jumpUserInfo">个人信息</div>
      <div class="btn logout" v-if="showTab.logoutBtnBol" @click="handleLogout">退出</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showTab: {
      type: Object,
      default: ()=>{
        return {
          backBtnBol: false, // 返回按钮 显示/隐藏
          userBtnBol: false, // 个人信息按钮 显示/隐藏
          logoutBtnBol: false // 退出登录按钮 显示/隐藏
        }
      }
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
  },

  mounted() {
    console.log(this.showTab)
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
  width: 100%;
  height: 1.5rem;
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