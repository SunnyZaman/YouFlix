<template>
  <v-app v-scroll="handleScroll">
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>-->
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    handleScroll() {
      // Change header color
      const header = document.getElementById("header");
      if (window.scrollY >= 10) {
        header.style.setProperty("background-color", "black", "important");
        // header.style.setProperty(
        //   "background-image",
        //   "linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0)",
        //   "important"
        // );
      } else {
        // header.style.setProperty(
        //   "background-color",
        //   "transparent",
        //   "important"
        // );
                header.style.setProperty("background-color", "rgba(0,0,0,0.1)", "important");

      }
    }
  }
};
</script>

<style scoped>
.v-application {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
