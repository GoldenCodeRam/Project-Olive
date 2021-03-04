<template>
  <div class="container">
    <p>{{ title }}</p>
    <input type="text" :placeholder="`You should put your ${title} here...`" />
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background: #ebebeb;
  padding: 0.5em;
  margin: 0.5em;
  box-shadow: 0 5px 5px #3b3b3b3b;

  border-radius: 10px;

  p {
    text-align: start;
    font-size: 16pt;
    font-family: "Quicksand", sans-serif;
    font-weight: 900;
    width: 90%;
    margin: 0;
  }

  input {
    width: 90%;
    border: none;
    outline: none;
    margin: 5px;
    padding: 5px;
    font-size: 14pt;

    border-radius: 5px;
  }
}
</style>
