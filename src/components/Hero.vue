<template>
  <v-img
    v-if="featuredVideo !== null"
    :src="getFeaturedImage(featuredVideo.snippet.thumbnails)"
    class="hero"
    gradient="to left, rgba(0,0,0,0), rgba(0,0,0,1)"
  >
    <v-row :justify="'start'" style="height: 98vh;">
      <v-col :align-self="'center'">
        <v-row>
          <h2 class="ma-2">{{featuredVideo.snippet.title}}</h2>
        </v-row>
        <v-row>
          <h3 class="ma-2">#1 On Trending</h3>
        </v-row>
        <v-row>
          <v-btn class="ma-2" depressed tile>
            <v-icon left>mdi-play</v-icon>Play
          </v-btn>
          <v-btn class="ma-2" tile>
            <v-icon left>mdi-information-outline</v-icon>More Info
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-img>
</template>

<script>
export default {
  name: "Hero",
  props: ["featuredVideo"],
  methods: {
    getFeaturedImage(thumbnails) {
      const thumbnail =
        thumbnails.maxres !== undefined
          ? thumbnails.maxres.url
          : this.featuredVideo.snippet.thumbnails.standard.url;
      return thumbnail;
    }
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 98vh;
  padding-left: 60px;
  /* top: 0; */
}
</style>