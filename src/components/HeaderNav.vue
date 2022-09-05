<template>
  <div class="header-nav flex">
    <div class="left">
      <div
        class="flex align-center btn pointer"
        v-if="showTab.backBtnBol"
        @click="handleBack"
      >
        <i class="iconfont icon-fanhui" />
        返回
      </div>
    </div>
    <div class="right flex">
      <div
        class="flex align-center btn pointer personalCenter"
        v-if="showTab.userBtnBol"
        @click="jumpUserInfo"
      >
        <i class="iconfont icon-gerenxinxi" />
        <!-- 个人信息 -->
      </div>
      <div
        class="flex align-center btn pointer logout"
        v-if="showTab.logoutBtnBol"
        @click="handleLogout"
      >
        <i class="iconfont icon-tuichu" />
        退出
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showTab: {
      type: Object,
      default: () => {
        return {
          backBtnBol: false, // 返回按钮 显示/隐藏
          userBtnBol: false, // 个人信息按钮 显示/隐藏
          logoutBtnBol: false, // 退出登录按钮 显示/隐藏
        };
      },
    },
  },

  methods: {
    // 返回
    handleBack() {
      this.$router.back(-1);
    },

    // 跳转个人信息
    jumpUserInfo() {
      this.$router.push("/userInfo");
    },

    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("phone");
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-nav {
  width: 100%;
  height: 1.5rem;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem;
  font-size: 0.5rem;
  justify-content: space-between;

  .btn {
    padding: 0.1rem 0.3rem;
    color: #1aa8db;
    font-size: 0.5rem;
  }

  .icon-fanhui {
    font-size: 0.5rem;
  }

  .icon-gerenxinxi {
    font-size: 0.85rem;
  }

  .icon-tuichu {
    font-size: 0.7rem;
    margin-right: 0.1rem;
  }

  .personalCenter {
    margin-right: 0.5rem;
    margin-top: 0.05rem;
  }
}
</style>
