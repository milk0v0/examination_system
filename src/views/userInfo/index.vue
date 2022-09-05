<template>
  <div class="userInfo-page align-center">
    <div class="userInfo-box" :class="{ load: !info.userId }">
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
        <div class="desc">
          {{ info.province }}{{ info.city }}{{ info.county }}
        </div>
      </div>
      <div class="list">
        <div class="name">详细地址:</div>
        <div class="desc">{{ info.address }}</div>
      </div>
      <div class="list">
        <div class="name">userId:</div>
        <div class="desc">{{ info.userId }}</div>
      </div>
      <div class="list">
        <div class="name">ada:</div>
        <div class="desc">{{ info.ada }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo } from "@/api";
export default {
  data() {
    return {
      info: {},
    };
  },
  methods: {
    getUserInfo() {
      userInfo({
        userId: localStorage.getItem("userId"),
      }).then((res) => {
        let { code, msg, data } = res;
        if (code == 200) {
          this.info = data;
          this.info.userId = localStorage.getItem("userId");
        } else {
          this.$message.error(msg);
        }
      });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.userInfo-page {
  width: 80%;
  max-width: 10rem;
  min-height: calc(100vh - 4.6rem);
  box-sizing: border-box;
  margin: auto;

  .userInfo-box {
    width: 100%;

    .list {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      font-size: 0.5rem;
      margin-top: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 0.03rem solid #e6e6e6;

      &:nth-last-of-type(1) {
        border: 0;
      }

      .name {
        width: 40%;
      }

      .desc {
        width: 60%;
      }
    }

    &.load {
      .desc {
        background-color: #f2f3f5;
        animation: fade 0.6s ease-in-out alternate infinite both;
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
