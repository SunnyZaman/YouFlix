<template>
  <div>
    <v-app-bar color="rgba(0,0,0,0.1)" dense dark fixed elevation="0" id="header">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>YouFlix</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        :outlined="isOutlined"
        solo
        dense
        single-line
        hide-details
        class="shrink"
        :background-color="backgroundColor"
        color="rgb(229,9,20)"
        @click:prepend-inner="searchCheck"
        :prepend-inner-icon="search?'mdi-close-circle':'mdi-magnify'"
      ></v-text-field>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
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
      isOutlined: false,
      backgroundColor: "transparent",
      search: false
    };
  },
  methods: {
    searchCheck() {
      console.log("expand Search");
      this.isOutlined = !this.isOutlined;
      this.backgroundColor = this.search ? "transparent" : "black";
      const text = document.getElementsByClassName("v-text-field")[0];
      text.style.width = this.search ? "40px" : "300px";
      this.search = !this.search;
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
}
</style>