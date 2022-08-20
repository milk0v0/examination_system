<template>
	<div class="exam">
		<Nav :endTime="endTime" />
	</div>
</template>

<script>
	import { startExam } from "@/api";
	import Nav from "./components/Nav";

	export default {
		name: "exam",
		components: { Nav },
		data() {
			return {
				endTime: Date.now() + 40 * 1000 * 60,
				questionList: [],
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
</style>