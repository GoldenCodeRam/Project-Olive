<template>
  <div class="container">
    <img alt="Vue logo" src="@/assets/logo.svg" />
    <p>Project Olive</p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 20%;
  background: #a0cc55;
  box-shadow: 0 2px 10px #698637;
  z-index: 999;

  img {
    max-width: 8em;
  }

  p {
    color: #333333;
    margin-top: -20px;
    margin-bottom: 0;
    font-family: "Quicksand", cursive;
    font-weight: 900;
    font-size: 45px;
    padding-bottom: 10px;
  }
}
</style>
