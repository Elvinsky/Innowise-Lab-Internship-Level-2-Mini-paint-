<template>
  <header>
    <h1>Welcome to</h1>
    <h1><span>OCTODRAW</span></h1>
    <h1><slot></slot></h1>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3em;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1em;
  font-size: 1.4em;
  background-color: aliceblue;
}
header img {
  width: 30px;
  height: 30px;
}
header h1 {
  align-self: center;
  justify-self: center;
}
header span {
  letter-spacing: 8px;
  color: rgba(249, 73, 73, 255);
}
</style>
