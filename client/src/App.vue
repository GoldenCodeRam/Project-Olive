<template>
  <logo-bar></logo-bar>
  <div class="mainContainer">
    <div class="flexInputContainer">
      <div class="inputContainer">
        <p class="title">Insert information</p>
        <text-input title="Name" v-model:textInput="nameTextInput"></text-input>
        <text-input
          title="Favorite game"
          v-model:textInput="favoriteGameTextInput"
        ></text-input>
        <text-input
          title="Favorite food"
          v-model:textInput="favoriteFoodTextInput"
        ></text-input>
        <custom-button
          v-on:click="sendInformationToMiddleware"
          text="Send"
          imageClass="fas fa-paper-plane"
        />
      </div>
    </div>
    <div class="infoContainer">
      <p class="title">Insert information</p>
      <table style="width:100%">
        <tr>
          <th>Name</th>
          <th>Game</th>
          <th>Food</th>
        </tr>
        <tr v-for="(item, key) in databaseInformation" :key="key">
          <td>{{ item.name }}</td>
          <td>{{ item.game }}</td>
          <td>{{ item.food }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import CustomButton from "./components/CustomButton.vue";
import LogoBar from "./components/LogoBar.vue";
import TextInput from "./components/TextInput.vue";

const MIDDLEWARE_HOST_GET = "http://localhost:8082/getInformation";
const MIDDLEWARE_HOST_POST = "http://localhost:8082/sendInformation";

interface Information {
  name: string;
  game: string;
  food: string;
}

export default {
  components: {
    LogoBar,
    TextInput,
    CustomButton
  },
  data() {
    const nameTextInput = ref<string>();
    const favoriteGameTextInput = ref<string>();
    const favoriteFoodTextInput = ref<string>();

    const databaseInformation = ref<Information[]>([]);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", MIDDLEWARE_HOST_GET);
    xhr.onloadend = function(): void {
      const databaseInformationObject = JSON.parse(xhr.responseText);
      for (const index in databaseInformationObject.documents) {
        const object = databaseInformationObject.documents[index];
        databaseInformation.value.push({
          name: object.name,
          game: object.game,
          food: object.food
        });
      }
    };
    xhr.send();

    function sendInformationToMiddleware() {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", MIDDLEWARE_HOST_POST);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(
        JSON.stringify({
          name: nameTextInput.value,
          food: favoriteFoodTextInput.value,
          game: favoriteGameTextInput.value
        })
      );
      xhr.onloadend = () => {
        console.log("done");
      };
    }

    return {
      sendInformationToMiddleware,
      nameTextInput,
      favoriteGameTextInput,
      favoriteFoodTextInput,
      databaseInformation
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
  height: 80%;
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
