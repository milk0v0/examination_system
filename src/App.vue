<template>
	<div id="app">
    <HeaderNav></HeaderNav>
		<router-view class="flex justify-content-center"></router-view>
	</div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
export default {
  components: {HeaderNav}
}
</script>

<style lang="scss">
	html,
	body {
		width: 100%;
		height: 100%;
	}

	* {
		margin: 0;
		padding: 0;
	}

	#app {
		max-width: 800px;
		min-height: 100%;
		margin: auto;
	}

	.flex {
		display: flex;
	}

	.justify-content-center {
		justify-content: center;
	}

	.justify-content-space-evenly {
		justify-content: space-between;

		&:before,
		&:after {
			content: "";
			display: block;
		}
	}
</style>