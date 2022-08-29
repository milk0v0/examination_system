<template>
	<div class="home-page">
		<div class="home-box">
			<div class="exam-list flex pointer" @click="jumpExamStart(true)">
				<p class="title">模拟考试</p>
				<div class="desc">
					<span>已考 {{ info.sfNum }} 次</span>
					<span>可考 {{ info.sufNum }} 次</span>
				</div>
			</div>
			<div class="exam-list flex pointer" @click="jumpExamStart(false)">
				<p class="title">正式考试</p>
				<div class="desc">
					<span>已考 {{ info.fNum }} 次</span>
					<span>可考 {{ info.ufNum }} 次</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getExamInfo } from "@/api";
	export default {
		name: "home",
		data() {
			return {
				info: {
					sfNum: 0,
					sufNum: 0,
					fNum: 0,
					ufNum: 0,
				},
			};
		},

		created() {
			this.getExamInfo();
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

			// 跳转开始考试界面
			jumpExamStart(bol) {
				const canJump = bol ? 'sufNum' : 'ufNum';
				if(this.info[canJump] <= 0) return this.$message.error('您已没有考试次数了嗷');

				this.$router.push(
					`/examStart?${bol ? "imitate=true&" : ""}questionNum=${
						this.info.questionNum
					}&examMin=${this.info.examMin}`
				);
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
			width: 80%;
			margin-top: 1rem;

			.exam-list {
				width: 100%;
				height: 4rem;
				box-sizing: border-box;
				border: 1px solid #b1b1b1;
				justify-content: space-between;
				flex-direction: column;
				border-radius: 0.08rem;
				font-size: 0.45rem;
				text-align: center;
				padding: 0.7rem 0.5rem;
				margin-bottom: 1rem;

				.title {
					font-size: 0.8rem;
				}

				.desc span:first-child {
					margin-right: 0.3rem;
				}
			}
		}
	}
</style>