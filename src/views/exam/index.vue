<template>
	<div class="exam flex-direction-column">
		<template v-if="questionList.length">
			<Nav :endTime="endTime" />
			<Answer :info="questionList[index]" />
		</template>
	</div>
</template>

<script>
	import { startExam } from "@/api";
	import Nav from "./components/Nav";
	import Answer from "./components/Answer";

	export default {
		name: "exam",
		components: { Nav, Answer },
		data() {
			return {
				endTime: Date.now() + 40 * 1000 * 60,
				questionList: [],
				index: 0,
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
		methods: {},
	};
</script>

<style lang="scss" scoped>
	.exam {
		width: 80%;
		margin: auto;
	}
</style>