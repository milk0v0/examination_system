<template>
	<div class="examStart-page">
		<div class="examStart-box">
			<div class="tips">
				<p>本次考试题目共{{ $route.query.questionNum }}道</p>
				<p>考试时间 {{ $route.query.examMin }} 分钟，到时间自动交卷</p>
			</div>
			<div class="btn pointer" @click="jumpExam">开始考试</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			// 跳转答题页
			jumpExam() {
				let { imitate = false } = this.$route.query;
				this.$router.replace(`/exam${imitate ? "?imitate=true" : ""}`);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.examStart-page {
		width: 10rem;
		box-sizing: border-box;
		margin: auto;

		.examStart-box {
			width: 80%;
			margin-top: 1.8rem;
		}

		.tips {
			width: 100%;
			box-sizing: border-box;
			border-radius: 0.08rem;
			font-size: 0.55rem;
			text-align: center;
			padding: 2rem 0.2rem;

			p {
				margin-bottom: 0.4rem;
			}
		}

		.btn {
			width: 5rem;
			height: 1.1rem;
			box-sizing: border-box;
			line-height: 1.1rem;
			font-size: 0.4rem;
			background-color: #169bd5;
			color: #fff;
			text-align: center;
			margin: 1.5rem auto;
			border-radius: 0.08rem;
		}
	}
</style>
