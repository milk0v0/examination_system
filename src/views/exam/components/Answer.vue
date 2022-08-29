<template>
	<div class="answer">
		<div class="title">{{ info.index }}. {{ info.title }}</div>
		<div class="info flex" v-for="item in info.options" :key="item.indexNumber">
			<input
				:type="info.type == 1 ? 'radio' : 'checkbox'"
				:id="'input' + item.indexNumber"
				name="input"
				:value="item.indexNumber"
				v-model="proxy"
			/>
			<label :for="'input' + item.indexNumber">{{ item.questionOption }}</label>
		</div>
	</div>
</template>

<script>
	export default {
		name: "examAnswer",
		props: {
			info: {
				type: Object,
			},
			value: {
				type: [Array, Number],
			},
		},
		computed: {
			proxy: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal);
				},
			},
		},
	};
</script>

<style lang="scss" scoped>
	.title {
		font-size: 0.5rem;
		margin-bottom: 1rem;
	}

	.info {
		font-size: 0.5rem;
		margin-top: 0.5rem;

		label {
			width: 100%;
			margin-left: 0.2rem;
		}
	}
</style>