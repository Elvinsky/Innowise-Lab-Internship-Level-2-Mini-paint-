<template>
  <div>
    <div class="background"></div>
    <RouterView />
  </div>
</template>

<style lang="scss">
$font-family: Avenir, Helvetica, Arial, sans-serif;
$background-color: rgba(0, 30, 255, 0.177);

* {
  margin: 0;
  padding: 0;
  border-spacing: 0;
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $background-color;
    z-index: -99999;
  }
}
</style>
