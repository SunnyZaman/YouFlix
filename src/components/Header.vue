<template>
  <div>
    <v-app-bar color="rgba(0,0,0,0.1)" dense dark fixed elevation="0" id="header">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>YouFlix</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

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
  name: "Header"
};
</script>
<style scoped>
#header{
    transition: all 0.2s ease-in-out;
}
</style>