<template>
  <div class="examNav flex justify-evenly">
    <span v-if="isHistory">
      模考记录
    </span>
    <span v-else>
      <i class="iconfont icon-daojishi" />
      {{ examMin }}
    </span>
    <span class="click" @click="$emit('click')">试题列表</span>
  </div>
</template>

<script>
export default {
  name: "examNav",
  props: {
    endTime: {
      type: Number,
    },
    isHistory: {
      type: Boolean,
    }
  },
  data() {
    return {
      examMin: "40:00",
      isEnd: false,
    };
  },
  created() {
    this.getExamMin();
  },
  methods: {
    getExamMin() {
      if(this.navStr) return;
      const timeDiffer = this.endTime - Date.now();
      const minute = parseInt(timeDiffer / (1000 * 60));
      const second = parseInt((timeDiffer % (1000 * 60)) / 1000);
      this.examMin = `${minute < 10 ? "0" + minute : minute}:${
        second < 10 ? "0" + second : second
      }`;

      if (timeDiffer <= 0 || this.isEnd) return;
      requestAnimationFrame(this.getExamMin);
    },
  },
};
</script>

<style lang="scss" scoped>
.examNav {
  padding: 0.35rem 0.05rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.15);

  span {
    font-size: 0.6rem;
  }

  .click {
    color: #169bd5;
    transition: 0.3s color;
    cursor: pointer;

    &:hover {
      color: #166fd5;
    }
  }
}

.iconfont {
  font-size: 0.6rem;
  color: #1aa8db;
}
</style>
