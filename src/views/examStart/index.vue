<template>
  <div class="examStart-page">
    <div class="examStart-box">
      <div class="tips">
        <p>本次考试题目共50道</p>
        <p>考试时间 40 分钟，到时间自动交卷</p>
      </div>
      <div class="btn" @click="jumpExam">开始考试</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 跳转答题页
    jumpExam() {
      this.$router.push('/exam')
    }
  }
}
</script>

<style scoped>
.examStart-page {
  width: 10rem;
  box-sizing: border-box;
  margin: auto;
}

.examStart-box {
  width: 80%;
  margin-top: 1rem;
}
.examStart-box .tips {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #b1b1b1;
  border-radius: .08rem;
  font-size: .45rem;
  text-align: center;
  padding: 2rem .2rem;
}
.examStart-box .tips p {
  margin-bottom: .2rem;
}

.examStart-box .btn {
  width: 5rem;
  height: 1.1rem;
  box-sizing: border-box;
  line-height: 1.1rem;
  font-size: .4rem;
  background-color: #169bd5;
  color: #fff;
  text-align: center;
  margin: 1.5rem auto;
  border-radius: .08rem;
}
</style>
