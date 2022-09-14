<template>
  <div class="answer">
    <div class="title listStyle flex align-start" :style="isHistory && { 'margin-bottom': '0.5rem' }">
      <div class="abc">{{ info.index }}.</div>
      <div>{{ info.title }}</div>
    </div>
    <div class="info flex align-center" v-for="item in info.options" :key="item.indexNumber">
      <input
        :type="info.type == 1 ? 'radio' : 'checkbox'"
        :id="'input' + item.indexNumber"
        name="input"
        :value="item.indexNumber"
        v-model="proxy"
      />
      <label class="listStyle flex align-start" :for="'input' + item.indexNumber">
        <div class="abc">{{ String.fromCharCode(+item.indexNumber + 64) + '.' }}</div>
        <div>{{ item.questionOption }}</div>
      </label>
    </div>
    <div v-if="isHistory" class="history flex justify-evenly">
      <span
        >正确答案：<span
          v-for="(answer, index) in info.answer.split('+')"
          :key="'answer' + index"
          >{{ String.fromCharCode(+answer + 64) }}</span
        ></span
      >
      <span :class="{ warn: info.userAnswer != info.answer }"
        >我的答案：<span
          v-for="(answer, index) in info.userAnswer.split('+')"
          :key="'answer' + index"
          >{{ answer ? String.fromCharCode(+answer + 64) : '' }}</span
        ></span
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "examAnswer",
    props: {
      info: {
        type: Object,
      },
      value: {
        type: [Array, Number],
      },
      isHistory: {
        type: Boolean,
      },
    },
    computed: {
      proxy: {
        get() {
          return this.value;
        },
        set(newVal) {
          this.$emit("input", newVal);
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    font-size: 0.5rem;
    margin-bottom: 1rem;
  }

  .listStyle {
    line-height: 0.725rem;

    div:nth-of-type(1) {
      margin-right: 0.1rem;
    }
  }

  .info {
    font-size: 0.5rem;
    padding: 0.25rem;
    border-bottom: 0.03rem solid #e6e6e6;

    input {
      width: 0.4rem;
      height: 0.4rem;
    }

    label {
      width: 100%;
      margin-left: 0.2rem;
    }
  }

  .history {
    margin-top: 0.5rem;
    font-size: 0.5rem;
    color: green;

    > span:nth-of-type(1) {
      margin-right: 0.3rem;
    }

    .warn {
      color: red;
    }
  }
</style>
