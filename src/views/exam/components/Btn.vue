<template>
	<div class="btn flex justify-evenly">
		<div :class="{ off: index <= 0 }" @click="index > 0 && $emit('pre')">
			上一题
		</div>
		<div @click="handleClick">{{ index >= total - 1 ? "交卷" : "下一题" }}</div>
	</div>
</template>

<script>
	export default {
		name: "examBtn",
		props: {
			index: {
				type: Number,
			},
			total: {
				type: Number,
			},
		},
		methods: {
			handleClick() {
				if (this.index >= this.total - 1) {
					this.$emit("submit");
				} else {
					this.$emit("next");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btn {
		> div {
			width: 38%;
			border-radius: 0.15rem;
			font-size: 0.45rem;
			text-align: center;
			background-color: rgb(22, 155, 213);
			color: #fff;
			line-height: 1rem;
			cursor: pointer;

			&.off {
				background-color: #16d5c7;
				cursor: no-drop;
			}
		}
	}
</style>