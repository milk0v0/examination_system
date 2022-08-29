<template>
	<div class="exam flex-direction-column">
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
			class="list_bg flex justify-content-center align-items-center"
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
	</div>
</template>

<script>
	import { startExam, subAnswer, subPapers, test } from "@/api";
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
			};
		},
		created() {
			// test({
			// 	userId: localStorage.getItem("userId"),
			// });
			// return;
			startExam({
				userId: localStorage.getItem("userId"),
			}).then(({ code, msg, data }) => {
				if (code != 200) return this.$message.error(msg);

				const { endTime, examMin, questionList, userAnswerList } = data.examInfo;
				const allTime = Date.now() + examMin * 60 * 1000;
				const time = endTime > allTime ? allTime : endTime;

				const list = JSON.parse(userAnswerList);
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
					const { questionId, answer } = this.handleAnswer();

					subAnswer({
						userId: localStorage.getItem("userId"),
						questionId,
						answer,
					});
				}
				this.index += num;
				this.answer = this.nextAnswer(this.index);
			},

			handleSubmit() {
				const { questionId, answer } = this.handleAnswer();

				subPapers({
					userId: localStorage.getItem("userId"),
					questionId,
					answer,
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
</style>