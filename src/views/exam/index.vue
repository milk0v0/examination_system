<template>
	<div class="exam flex-direction-column">
		<template v-if="questionList.length">
			<Nav :endTime="endTime" />
			<Answer v-model="answer" :info="questionList[index]" />
			<Btn
				:index="index"
				:total="questionList.length"
				@pre="handleClick(-1)"
				@next="handleClick(1)"
				@submit="handleSubmit"
			/>
		</template>
	</div>
</template>

<script>
	import { startExam } from "@/api";
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
			};
		},
		created() {
			startExam({
				userId: localStorage.getItem("userId"),
			}).then(({ data }) => {
				const { examInfo } = data;
				const { examMin, questionList } = examInfo;

				this.questionList = questionList;
				this.endTime = Date.now() + examMin * 60 * 1000;
			});
		},
		methods: {
			handleClick(num) {
				if (num > 0) {
					console.log(this.answer);
				}
				this.index += num;
				this.answer = [];
			},
			handleSubmit() {
				console.log(this.questionList);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.exam {
		width: 80%;
		margin: auto;
	}

	.answer {
		margin-top: 1rem;
	}

	.btn {
		margin-top: 1rem;
	}
</style>