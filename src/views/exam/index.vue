<template>
	<div class="exam flex-direction-column">
		<div v-if="finishInfo.bol" class="exam-list flex">
			<p class="title">{{ finishInfo.examMsg }}</p>
			<div class="desc">得分：{{ finishInfo.score }}</div>
		</div>

		<template v-else>
			<template v-if="questionList.length">
				<Nav :endTime="endTime" @click="showList = true" />
				<Answer v-model="answer" :info="questionList[index]" />
				<Btn
					:index="index"
					:total="questionList.length"
					@pre="handleClick(-1)"
					@next="handleClick(1)"
					@submit="handleSubmit"
				/>
			</template>
			<div v-else class="ready">准备考试</div>
			<div
				v-if="showList"
				@click="showList = false"
				class="list_bg flex justify-content-center aic"
			>
				<div class="list">
					<div class="overflow">
						<div
							v-for="(item, i) in questionList"
							:key="item.id"
							class="pointer"
							:class="{
								on: userAnswerList[item.id],
							}"
							@click="handleChoice(i)"
						>
							{{ item.index }}
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { startExam, startExamMoni, subAnswer, subPapers, test } from "@/api";
	import Nav from "./components/Nav";
	import Answer from "./components/Answer";
	import Btn from "./components/Btn";

	export default {
		name: "exam",
		components: { Nav, Answer, Btn },
		data() {
			return {
				endTime: Date.now() + 40 * 1000 * 60,
				questionList: [],
				index: 0,
				answer: [],
				showList: false,
				userAnswerList: {}, // 已答
				imitate: this.$route.query.imitate,
				finishInfo: {
					bol: false,
					examMsg: "",
					score: 0,
				},
			};
		},
		created() {
			// test({
			// 	userId: localStorage.getItem("userId"),
			// });
			// return;

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
				if (code != 200) {
					setTimeout(() => {
						this.$router.back();
					}, 300);
					return this.$message.error(msg);
				}

				const { endTime, examMin, questionList, userAnswerList } = data.examInfo;
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
		},
		methods: {
			handleAnswer() {
				const { id, type } = this.questionList[this.index];
				const answer =
					type == 1
						? this.answer + ""
						: this.answer.sort((a, b) => a - b).join("+");

				if (!answer)
					return {
						noAnswer: true,
					};

				this.userAnswerList[id] = answer.split("+");

				return {
					questionId: id,
					answer,
				};
			},

			nextAnswer(index) {
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
				if (num > 0) {
					const { questionId, answer, noAnswer } = this.handleAnswer();

					!noAnswer &&
						subAnswer({
							userId: localStorage.getItem("userId"),
							questionId,
							answer,
							examType: this.imitate ? 2 : 1,
						});
				}
				this.index += num;
				this.answer = this.nextAnswer(this.index);
			},

			handleSubmit() {
				for (let i = 0; i < this.questionList.length - 1; i++) {
					const item = this.questionList[i];
					if (!this.userAnswerList[item.id])
						return this.$message.error(`您第${item.index}题还未答`);
				}

				const { questionId, answer, noAnswer } = this.handleAnswer();

				if (noAnswer) return this.$message.error(`您最后一题还未答`);

				subPapers({
					userId: localStorage.getItem("userId"),
					questionId,
					answer,
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
		min-height: 10rem;
		margin: 0.6rem auto 0;
	}

	.answer {
		margin-top: 1rem;
	}

	.btn {
		margin-top: 1rem;
	}

	.ready {
		text-align: center;
	}

	.list_bg {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;

		.list {
			width: 8rem;
			height: 9rem;
			box-sizing: border-box;
			margin-bottom: 1rem;
			padding: 0.3rem 0;
			border: 1px solid #000;
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
					border-radius: 0.1rem;
					background-color: #169bd5;
					text-align: center;
					line-height: 1rem;
					font-size: 0.6rem;
					margin: 0.235rem;
					color: #fff;
					box-sizing: border-box;

					&.on {
						border: 0.01rem solid #000;
						background-color: #fff;
						color: #000;
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
		height: 4rem;
		box-sizing: border-box;
		border: 1px solid #b1b1b1;
		justify-content: space-between;
		flex-direction: column;
		border-radius: 0.08rem;
		font-size: 0.45rem;
		text-align: center;
		padding: 0.7rem 0.5rem;
		margin: 1rem auto 0;

		.title {
			font-size: 0.8rem;
		}

		.desc span:first-child {
			margin-right: 0.3rem;
		}
	}
</style>