<template>
  <div id="app" :class="{ myScrollBar }">
    <HeaderNav :showTab="$route.meta ? $route.meta.showTab : {}"></HeaderNav>
    <router-view class="flex justify-center"></router-view>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
export default {
  components: { HeaderNav },
  data() {
    return {
      myScrollBar: !/Mobi|Android|iPhone/i.test(navigator.userAgent),
    };
  },
};
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
</style>
