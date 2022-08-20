<template>
	<div id="app">
    <HeaderNav></HeaderNav>
		<router-view></router-view>
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
</style>