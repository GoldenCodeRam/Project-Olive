<template>
  <button>
    <i :class="imageClass"></i>
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    imageClass: String
  }
};
</script>

<style lang="scss" scoped>
img {
  max-width: 3em;
}

button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  outline: none;
  text-decoration: none;
  padding: 0.2em 1em;
  border-radius: 5px;

  font-family: "Quicksand", cursive;
  font-weight: 900;
  font-size: 12pt;
  cursor: pointer;

  box-shadow: 0 3px 0 #b3b3b3c2;
  transform: translateY(-3px);

  i {
    font-size: 18pt;
    margin: 4pt;
  }
}
button:active {
  outline: none;
  box-shadow: none;
  transform: none;
}
button:hover {
  background: #fafafa;
  outline: none;
}
</style>
