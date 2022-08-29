<template>
  <div class="userInfo-page">
    <div class="userInfo-box">
      <div class="list">
        <div class="name">姓名:</div>
        <div class="desc">{{ info.name }}</div>
      </div>
      <div class="list">
        <div class="name">身份证号:</div>
        <div class="desc">{{ info.idNumber }}</div>
      </div>
      <div class="list">
        <div class="name">手机号:</div>
        <div class="desc">{{ info.phone }}</div>
      </div>
      <div class="list">
        <div class="name">学籍开始时间:</div>
        <div class="desc">{{ info.startTime }}</div>
      </div>
      <div class="list">
        <div class="name">地址:</div>
        <div class="desc">{{ info.province }}{{ info.city }}{{ info.county }}</div>
      </div>
      <div class="list">
        <div class="name">详细地址:</div>
        <div class="desc">{{ info.address }}</div>
      </div>
      <div class="list">
        <div class="name">userId:</div>
        <div class="desc">{{ userId }}</div>
      </div>
      <div class="list">
        <div class="name">ada:</div>
        <div class="desc">{{ info.ada }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/api'
export default {
  data() {
    return {
      userId: localStorage.getItem("userId"),
      info: {}
    }
  },
  methods: {
    getUserInfo() {
      userInfo({
        userId: this.userId || localStorage.getItem("userId"),
      }).then(res => {
        let { code, msg, data } = res
        if(code == 200) {
          this.info = data
        }else {
          this.$message(msg)
        }
      })
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userInfo-page {
  width: 10rem;
  box-sizing: border-box;
  margin: auto;
}

.userInfo-box {
  width: 90%;
}

.userInfo-box .list {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  font-size: .4rem;
  margin-top: 1rem;
}
.userInfo-box .list .name {
  width: 35%;
  font-weight: 400;
}
.userInfo-box .list .desc {
  width: 74%;
  font-weight: 500;
}
</style>
