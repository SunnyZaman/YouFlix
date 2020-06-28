<template>
  <v-app v-scroll="handleScroll">
    <Header />
    <div class="view-container">
      <router-view></router-view>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  methods: {
    handleScroll() {
      // Change header color
      const header = document.getElementById("header");
      if (window.scrollY >= 10) {
        header.style.setProperty("background-color", "#121212", "important");
      } else {
        header.style.setProperty(
          "background-color",
          "rgba(0,0,0,0.1)",
          "important"
        );
      }
    }
  }
};
</script>

<style scoped>
.v-application {
  font-family: Helvetica, Arial, sans-serif;
}
.view-container {
  min-height: calc(100vh - 300px);
}
</style>
