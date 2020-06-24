<template>
  <div>
    <v-app-bar color="rgba(0,0,0,0.1)" dense dark fixed elevation="0" id="header">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn text depressed>
        <v-img :src="require('@/assets/logo-small.png')" max-height="30" max-width="35" contain></v-img>
        <v-img
          class="mx-2"
          :src="require('@/assets/logo.png')"
          max-height="50"
          max-width="100"
          contain
        ></v-img>
      </v-btn>
      <!-- <v-toolbar-title>YouFlix</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-text-field
        :outlined="isOutlined"
        solo
        dense
        :flat="isFlat"
        single-line
        hide-details
        class="shrink"
        :background-color="backgroundColor"
        color="rgb(229,9,20)"
        @click:prepend-inner="searchCheck"
        :prepend-inner-icon="searching?'mdi-close-circle':'mdi-magnify'"
        @focus="focus"
        @focusout="focusOut"
      ></v-text-field>

      <v-menu left bottom open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="avatar-button mx-2">
            <!-- <v-img
              class="mx-2"
              :src="require('@/assets/avatar.png')"
              max-height="30"
              max-width="30"
              contain
            ></v-img>-->
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Logged in as Guest</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      textField: null,
      inputField: null,
      isOutlined: false,
      backgroundColor: "transparent",
      searching: false,
      isFlat: true
    };
  },
  mounted() {
    this.textField = document.getElementsByClassName("v-text-field")[0];
    this.inputField = this.textField.querySelector("input");
  },
  methods: {
    searchCheck() {
      if (this.searching) {
        this.focusOut();
      } else {
        this.inputField.focus();
      }
    },
    focus() {
      this.backgroundColor = "black";
      this.textField.style.width = "300px";
      this.isFlat = false;
      this.isOutlined = true;
      this.searching = true;
    },
    focusOut() {
      this.backgroundColor = "transparent";
      this.textField.style.width = "40px";
      this.isFlat = true;
      this.isOutlined = false;
      this.searching = false;
      this.inputField.blur();
    }
  }
};
</script>
<style scoped>
#header {
  transition: all 0.2s ease-in-out;
}
.v-text-field {
  width: 40px;
  transition: all 0.2s;
  border: none;
}
.avatar-button {
  height: 30px !important;
  min-width: 30px !important;
  background-image: url("~@/assets/avatar.png");
  background-size: cover;
}
</style>