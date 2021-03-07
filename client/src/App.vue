<template>
  <logo-bar></logo-bar>
  <div class="mainContainer">
    <div class="flexInputContainer">
      <div class="inputContainer">
        <p class="title">Insert information</p>
        <text-input title="Name" v-model:textInput="nameTextInput"></text-input>
        <text-input title="Favorite game"></text-input>
        <text-input title="Favorite food"></text-input>
        <custom-button
          v-on:click="sendInformationToMiddleware"
          text="Send"
          imageClass="fas fa-paper-plane"
        />
      </div>
    </div>
    <div class="infoContainer">
      <p class="title">Insert information</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import CustomButton from "./components/CustomButton.vue";
import LogoBar from "./components/LogoBar.vue";
import TextInput from "./components/TextInput.vue";

export default {
  components: {
    LogoBar,
    TextInput,
    CustomButton
  },
  data() {
    const nameTextInput = ref<string>();

    function sendInformationToMiddleware() {
      console.log(nameTextInput.value);
    }

    return {
      sendInformationToMiddleware,
      nameTextInput
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Quicksand&display=swap");

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.mainContainer {
  height: 72%;
  z-index: -100;
  margin: 0;
  padding: 0;
  display: flex;
}

.flexInputContainer {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: 40%;

  .inputContainer {
    display: flex;
    flex-direction: column;
    background: #90bc42;
    align-items: center;
    border-radius: 25px;
    padding-bottom: 1em;
    margin: 1em;

    .title {
      padding: 0;
      margin: 0.5em;
      font-size: 24pt;
      font-family: "Quicksand", cursive;
      font-weight: 900;
      color: white;
    }
  }
}

.infoContainer {
  display: flex;
  width: 60%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: #ebebeb;
}
</style>
