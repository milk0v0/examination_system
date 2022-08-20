<template>
	<div class="answer">
		{{ info.index }}
	</div>
</template>

<script>
	export default {
		name: "examAnswer",
		props: {
			info: {
				type: Object,
			},
		},
		created() {
			console.log(this.info);
		},
	};
</script>

<style lang="scss" scoped>
</style>