<template>
	<transition name="fade">
		<div v-if="visible" class="message flex" :class="['message-' + type]">
			<p class="content">{{ msg }}</p>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "Message",
		data() {
			return {
				visible: true,
				type: "",
				msg: "",
				duration: 0,
			};
		},
		mounted() {
			setTimeout(() => {
				this.visible = false;
				setTimeout(() => {
					this.$destroy(true);
					this.$el.parentNode.removeChild(this.$el);
				}, 500);
			}, this.duration || 2000);
		},
	};
</script>

<style lang="scss" scoped>
	.message {
		width: 80%;
		max-width: 380px;
		box-sizing: border-box;
		position: fixed;
		border-radius: 0.15rem;
		border: 1px solid #ebeef5;
		margin: auto;
		left: 0;
		right: 0;
		top: 10%;
		background-color: #edf2fc;
		padding: 0.25rem 0;
		color: #909399;

		.content {
			width: 100%;
			font-size: 0.4rem;
			line-height: 1;
			text-align: center;
		}
	}

	.message-success {
		background-color: #f0f9eb;
		border-color: #e1f3d8;
		color: #67c23a;
	}

	.message-error {
		background-color: #f0f0f0;
		border-color: #fde2e2;
		color: #f56c6c;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s, transform 0.4s;
	}

	.fade-enter-from,
	.fade-leave-to {
		transform: translateY(-20%);
		opacity: 0;
	}
</style>