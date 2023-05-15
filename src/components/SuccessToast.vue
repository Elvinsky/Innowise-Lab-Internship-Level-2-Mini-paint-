<template>
  <div class="toast-wrapper">
    <img src="@/assets/mark.png" alt="error" />
    <div class="text"><slot></slot></div>
  </div>
</template>

<style scoped lang="scss">
.toast-wrapper {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 3em;
  padding: 0.6em;
  background-color: rgba(134, 255, 101, 0.459);
  border-radius: 8px;
  box-shadow: 2px 3px 2px 1px rgba(0, 0, 0, 0.152);
  -webkit-transition: opacity 0.7s;
  transition: opacity 0.7s;

  font-size: 1.2em;

  width: 350px;
  height: fit-content;
  position: absolute;
  top: 20px;
  right: 20px;
  img {
    width: 25px;
  }
  .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
