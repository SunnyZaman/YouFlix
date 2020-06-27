<template>
  <v-footer padless app inset absolute class="footer-container">
    <v-icon
      v-for="icon in icons"
      :key="icon"
      class="mx-2"
      size="24px"
      color="grey"
      tag="a"
    >{{ icon }}</v-icon>
    <v-row v-for="(row, i) in rows" :key="i">
      <v-col v-for="(col, j) in row.cols" :key="i+j" class="pb-0">
        <a class="footer-text">{{col}}</a>
      </v-col>
    </v-row>
    <p class="footer-text mt-3" v-html="'&copy 2020 YouFlix, Inc'"></p>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram", "mdi-youtube"],
      rows: [
        {
          cols: ["Audio and Subtitles","Audio Description", "Help Center", "Gift Cards"]
        },
        {
          cols: ["Media Center","Investor Relations", "Jobs","Terms of Use"]
        },
        {
          cols: ["Privacy", "Legal Notices", "Cookie Preferences", "Corporate Information"]
        },
        {
          cols: ["Contact Us"]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.footer-container {
  display: block;
  max-width: 980px;
  margin: 20px auto 0;
  padding: 0 4%;
  background-color: #121212;
}
.footer-text{
    color: grey;
    font-size: 0.8em;
}
</style>