<template>
	<div></div>
</template>

<script>
	import { startExam } from "@/api";

	export default {
		name: "exam",
		data() {
			return {
				examMin: '00:00',
        questionList: []
			};
		},
    created () {
      startExam({
				userId: localStorage.getItem('userId')
			}).then((res) => {
				console.log(res);
			});
    },
	};
</script>

<style lang="scss" scoped>
</style>