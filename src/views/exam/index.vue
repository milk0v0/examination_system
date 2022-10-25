<template>
  <div class="exam flex-column">
    <div v-if="finishInfo.bol" class="exam-list">
      <p class="title">{{ finishInfo.examMsg }}</p>
      <div class="desc">{{ finishInfo.score }}</div>
      <div class="back" @click="$router.back()">返回</div>
    </div>

    <template v-else>
      <template v-if="questionList.length">
        <Nav
          :isHistory="isHistory"
          :endTime="endTime"
          @click="showList = true"
          @timeOut="handleSubPapers"
        />
        <Answer
          :isHistory="isHistory"
          v-model="answer"
          :info="questionList[index]"
        />
        <Btn
          :index="index"
          :total="questionList.length"
          :isHistory="isHistory"
          @pre="handleClick(-1)"
          @next="handleClick(1)"
          @submit="handleSubmit"
        />
      </template>
      <div v-else class="ready" />
      <div
        v-if="showList"
        @click="showList = false"
        class="list_bg flex justify-center align-center"
      >
        <div class="list">
          <div class="overflow">
            <div
              v-for="(item, i) in questionList"
              :key="item.id"
              class="pointer"
              :class="{
                on: userAnswerList[item.id]?.join(''),
                warn: isHistory && item.answer != item.userAnswer,
              }"
              @click="handleChoice(i)"
            >
              {{ item.index }}
            </div>
          </div>
        </div>
      </div>
      <!-- 弹出确认框 -->
      <div v-if="showOverlay" class="overlay">
        <div class="box">
          <div class="content flex justify-center align-center">是否确认交卷？</div>
          <div class="overlayBtn flex">
            <div class="pointer" @click="showOverlay = false">取消</div>
            <div
              class="pointer"
              @click="handleSubPapers"
            >
              确认
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {
    startExam,
    startExamMoni,
    subAnswer,
    subPapers,
    getMoniExamInfo,
  } from "@/api";
  import Nav from "./components/Nav";
  import Answer from "./components/Answer";
  import Btn from "./components/Btn";

  export default {
    name: "exam",
    components: { Nav, Answer, Btn },
    data() {
      const { imitate, examId } = this.$route.query;
      return {
        endTime: Date.now() + 40 * 1000 * 60,
        questionList: [],
        index: 0,
        answer: [],
        showList: false,
        userAnswerList: {}, // 已答
        imitate,
        finishInfo: {
          bol: false,
          examMsg: "",
          score: 0,
        },
        navStr: "",
        examId,
        isHistory: !!examId,
        active: false, // 主动修改 answer，跳过
        showOverlay: false,
      };
    },
    created() {
      if (this.examId) {
        getMoniExamInfo({
          userId: localStorage.getItem("userId"),
          examId: this.examId,
        }).then(({ code, msg, data }) => {
          if (code != 200) {
            setTimeout(() => {
              this.$router.back();
            }, 300);
            return this.$message.error(msg);
          }

          this.navStr = "模考记录";

          const obj = {};
          for (const item of data) {
            obj[item.id] = item.userAnswer.split("+");
          }

          this.userAnswerList = obj;

          this.questionList = data;
          this.answer = this.nextAnswer(0);
        });
      } else {
        let promise;

        if (this.imitate) {
          promise = startExamMoni({
            userId: localStorage.getItem("userId"),
          });
        } else {
          promise = startExam({
            userId: localStorage.getItem("userId"),
          });
        }

        promise.then(({ code, msg, data }) => {
          if (code == 300) {
            const { examMsg, score } = data;
            this.finishInfo = {
              bol: true,
              examMsg,
              score,
            };
            return;
          }

          if (code != 200) {
            setTimeout(() => {
              this.$router.back();
            }, 300);
            return this.$message.error(msg);
          }

          const { endTime, examMin, questionList, userAnswerList } =
            data.examInfo;
          const allTime = Date.now() + examMin * 60 * 1000;
          const time = endTime > allTime ? allTime : endTime;

          const list = userAnswerList ? JSON.parse(userAnswerList) : {};
          for (const key in list) {
            const item = list[key];
            list[key] = item.split("+");
          }

          this.userAnswerList = list;
          this.questionList = questionList;

          this.answer = this.nextAnswer(0);
          this.endTime = time;
        });
      }
    },
    watch: {
      answer(newVal) {
        if (this.active) return (this.active = false);
        if (this.isHistory) return;

        const { questionId, answer } = this.handleAnswer(newVal);

        subAnswer({
          userId: localStorage.getItem("userId"),
          questionId,
          answer,
          examType: this.imitate ? 2 : 1,
        });
      },
    },
    methods: {
      handleAnswer(_answer) {
        const { id, type } = this.questionList[this.index];
        const answer =
          type == 1
            ? _answer + ""
            : [..._answer]
                .filter((i) => i)
                .sort((a, b) => a - b)
                .join("+");

        this.userAnswerList[id] = answer.split("+");

        return {
          questionId: id,
          answer,
        };
      },

      nextAnswer(index) {
        this.active = true;
        const { id, type } = this.questionList[index];
        const res = this.userAnswerList[id];
        if (!res) return [];

        if (type == 1) {
          return +res[0];
        } else {
          return [...res];
        }
      },

      handleClick(num) {
        this.index += num;
        this.answer = this.nextAnswer(this.index);
      },

      handleSubmit() {
        for (let i = 0; i < this.questionList.length; i++) {
          const item = this.questionList[i];
          if (!this.userAnswerList[item.id]?.join(""))
            return this.$message.error(`您第${item.index}题还未答`);
        }

        this.showOverlay = true;
      },

      handleSubPapers() {
        this.showOverlay = false;

        subPapers({
          userId: localStorage.getItem("userId"),
          examType: this.imitate ? 2 : 1,
        }).then(({ code, msg, data }) => {
          if (code != 200) return this.$message.error(msg);

          const { score, examMsg } = data;

          this.finishInfo = {
            bol: true,
            examMsg,
            score,
          };
        });
      },

      handleChoice(index) {
        this.index = index;
        this.answer = this.nextAnswer(this.index);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .exam {
    width: 80%;
    max-width: 10rem;
    min-height: 70vh;
    margin: 0.6rem auto 0;
    padding-bottom: 0.6rem;
  }

  .answer {
    margin-top: 1rem;
  }

  .btn {
    margin-top: 1rem;
  }

  .ready {
    width: 96px;
    height: 96px;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: auto;
    border-top: 6px solid #ee822b;
    border-radius: 50%;
    animation: 1s spin linear infinite;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 72px;
      height: 72px;
      margin: auto;
      border-bottom: 4px solid #f2c213;
      border-radius: 50%;
      animation: 2.8s spin linear infinite;
    }
  }

  .list_bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);

    .list {
      width: 8rem;
      height: 9rem;
      box-sizing: border-box;
      margin-bottom: 3rem;
      padding: 0.3rem 0;
      border-radius: 0.25rem;
      background-color: #fff;

      .overflow {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-left: 0.3rem;
        -webkit-overflow-scrolling: touch;

        div {
          float: left;
          width: 1rem;
          height: 1rem;
          border: 0.01rem solid #000;
          border-radius: 0.1rem;
          background-color: #fff;
          text-align: center;
          line-height: 1rem;
          font-size: 0.6rem;
          margin: 0.235rem;
          color: #333;
          box-sizing: border-box;

          &.on {
            border: 0.01rem solid #169bd5;
            background-color: #169bd5;
            color: #fff;
          }

          &.warn {
            border: 0.01rem solid red;
            background-color: red;
          }
        }

        ::after {
          display: block;
          content: "";
          clear: both;
        }
      }
    }
  }

  .exam-list {
    width: 100%;
    max-width: 10rem;
    box-sizing: border-box;
    font-size: 0.45rem;
    text-align: center;
    padding: 0.7rem 0.5rem;
    margin: 1rem auto 0;

    .title {
      font-size: 0.8rem;
    }

    .desc {
      font-size: 0.6rem;
      margin-top: 0.5rem;

      span:first-child {
        margin-right: 0.3rem;
      }
    }

    .back {
      width: 5rem;
      height: 1.2rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 1.2rem;
      font-size: 0.4rem;
      background-color: #169bd5;
      color: #fff;
      text-align: center;
      margin: 2rem auto;
      border-radius: 0.08rem;
    }
  }

  @keyframes spin {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  .overlay {
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);

    .box {
      position: absolute;
      max-width: 8rem;
      width: 65%;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 16px;

      .content {
        padding: 30px 20px;
        font-size: 0.4rem;
        min-height: 60px;
        color: #333;
      }

      .overlayBtn {
        font-size: 0.4rem;
        border-top: 0.03rem solid rgba(50, 50, 51, 0.05);

        div {
          line-height: 48px;
          flex: 1;
          text-align: center;

          &:nth-last-of-type(1) {
            color: #ee0a24;
            border-left: 0.03rem solid rgba(50, 50, 51, 0.05);
          }
        }
      }
    }
  }
</style>
