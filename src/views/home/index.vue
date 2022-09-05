<template>
  <div class="home-page">
    <div
      class="home-box flex align-center flex-column justify-evenly"
      :style="(history.length && !type || type == 2) && { height: 'calc(100vh - 2rem)' }"
    >
      <div v-if="!type || type == 2" class="exam-list flex pointer" @click="jumpExamStart(true)">
        <p class="title">
          <i class="iconfont icon-a-zaixianxuexikaoshipeixunkecheng-05" />
          模拟考试
        </p>
        <div class="desc">
          <span>已考 {{ info.sfNum }} 次</span>
          <span>可考 {{ info.sufNum }} 次</span>
        </div>
      </div>
      <div v-if="!type || type == 1" class="exam-list flex pointer" @click="jumpExamStart(false)">
        <p class="title">
          <i class="iconfont icon-a-zaixianxuexikaoshipeixunkecheng-05" />
          正式考试
        </p>
        <div class="desc">
          <span>已考 {{ info.fNum }} 次</span>
          <span>可考 {{ info.ufNum }} 次</span>
        </div>
      </div>
      <div v-if="history.length && (!type || type == 2)" class="history">
        <div class="title flex align-center">
          <div />
          <i class="iconfont icon-a-zaixianxuexikaoshipeixunkecheng-02" />
          <span>模拟考试记录</span>
        </div>
        <div class="content">
          <div class="item" v-for="item in history" :key="item.examId">
            <div class="time">{{ item.examDate }}</div>
            <div class="result">成绩：{{ item.score }}</div>
            <div class="go pointer" @click="checkHistory(item.examId)">
              点击查看
              <i class="iconfont icon-xiayiyeqianjinchakangengduo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getExamInfo, getMoniHisList } from "@/api";
  export default {
    name: "home",
    data() {
      return {
        history: [],
        info: {
          sfNum: 0,
          sufNum: 0,
          fNum: 0,
          ufNum: 0,
          examType: false,
        },
        type: this.$getSearch('type')
      };
    },

    created() {
      console.log(this.type);
      this.getExamInfo();
      this.getHistory();
    },

    methods: {
      // 获取考试信息
      getExamInfo() {
        getExamInfo({
          userId: this.userId || localStorage.getItem("userId"),
        }).then((res) => {
          let { code, msg, data } = res;
          if (code == 200) {
            this.info = data;
          } else {
            this.$message.error(msg);
          }
        });
      },

      getHistory() {
        getMoniHisList({
          userId: this.userId || localStorage.getItem("userId"),
        }).then(({ code, msg, data }) => {
          if (code == 200) {
            this.history = data;
          } else {
            this.$message.error(msg);
          }
        });
      },

      // 跳转开始考试界面
      jumpExamStart(bol) {
        const {
          examType, // 是否可以参加正式考试 可以：true 不可以 false
          examReason, // 不能参加正式考试的原因
          moniFlag, // 是否可以参加模拟考试 可以：true 不可以 false
          moniReason, // 不能参加模拟考试的原因
          questionNum, // 正式考试题目数量
          examMin, // 正式考试时长(分钟)
          moniQuestionNum, // 模拟考试题目数量
          moniExamMin, // 模拟考试时长（分钟）
        } = this.info;

        if (!bol && !examType) return this.$message.error(examReason);
        if (!bol && !moniFlag) return this.$message.error(moniReason);

        this.$router.push(
          `/examStart?${bol ? "imitate=true&" : ""}questionNum=${
            bol ? moniQuestionNum : questionNum
          }&examMin=${bol ? moniExamMin : examMin}`
        );
      },

      checkHistory(examId) {
        this.$router.push({
          name: "exam",
          query: { examId },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .home-page {
    width: 10rem;
    box-sizing: border-box;
    margin: auto;

    .home-box {
      width: 90%;
      height: calc(100vh - 6rem);

      .exam-list {
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        flex-direction: column;
        border-radius: 0.2rem;
        font-size: 0.45rem;
        text-align: center;
        padding: 0.4rem 0.5rem;
        box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.15);

        .title {
          font-size: 0.8rem;
        }

        .desc {
          color: #b3b3b3;
          margin-top: 0.2rem;
        }

        .desc span:first-child {
          margin-right: 0.3rem;
        }
      }

      .history {
        width: 100%;
        max-height: 38vh;
        font-size: 0.6rem;

        .title {
          div {
            width: 0.1rem;
            height: 0.6rem;
            margin-right: 0.2rem;
            background-color: #b3b3b3;
          }

          i {
            font-size: 0.6rem;
            margin-right: 0.3rem;
          }

          span {
            font-size: 0.5rem;
            color: #333;
          }
        }

        .content {
          height: calc(100% - 0.9561rem);
          margin-top: 0.3rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;

          .item {
            position: relative;
            margin: 0.3rem;
            padding: 0.3rem 0.5rem;
            border-radius: 0.15rem;
            box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.1);

            .time {
              font-size: 0.46rem;
            }

            .result {
              margin-top: 0.1rem;
              font-size: 0.4rem;
              color: #b3b3b3;
            }

            .go {
              position: absolute;
              right: 0.8em;
              top: 50%;
              margin: auto;
              font-size: 0.5rem;
              color: #1aa8db;
              transform: translateY(-50%);

              i {
                font-size: 0.5rem;
              }
            }
          }
        }
      }
    }
  }

  .iconfont {
    color: #1aa8db;
  }
</style>
