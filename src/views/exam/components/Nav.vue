<template>
	<div class="examNav flex justify-content-space-evenly">
		<span>{{ examMin }}</span>
		<span class="click" @click="$emit('click')">试题列表</span>
	</div>
</template>

<script>
	export default {
		name: "examNav",
		props: {
			endTime: {
				type: Number,
			},
		},
		data() {
			return {
				examMin: "40:00",
				isEnd: false,
			};
		},
		created() {
			this.getExamMin();
		},
		methods: {
			getExamMin() {
				const timeDiffer = this.endTime - Date.now();
				const minute = parseInt(timeDiffer / (1000 * 60));
				const second = parseInt((timeDiffer % (1000 * 60)) / 1000);
				this.examMin = `${minute < 10 ? "0" + minute : minute}:${
					second < 10 ? "0" + second : second
				}`;

				if (timeDiffer <= 0 || this.isEnd) return;
				requestAnimationFrame(this.getExamMin);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.examNav {
		padding: 0.3rem 0;
		border: 1px solid;

		span {
			font-size: 0.6rem;
		}

		.click {
			color: #169bd5;
			transition: 0.3s color;
			cursor: pointer;

			&:hover {
				color: #166fd5;
			}
		}
	}
</style>