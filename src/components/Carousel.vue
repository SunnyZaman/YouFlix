<template>
  <v-flex v-if="videos.length>0">
    <!-- {{trendingData}} -->
    <h2>{{category}}</h2>
    <v-carousel>
      <v-carousel-item v-for=" i in 7" :key="i">
        <v-layout row>
          <v-col
            v-for="(j,k) in videos.slice((i-1)*5,5*i)"
            :key="category+i+k"
          md=2.4
               sm=2.4
          >
          <!-- {{j}} -->
          <!-- {{i}} -->
            <!-- <v-card> -->
              <v-img :src="j.snippet.thumbnails.high.url" width="100%" height="200"></v-img>
              <!-- <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{j+i}}</h3>
                  <div>Card text</div>
                </div>
              </v-card-title> -->
            <!-- </v-card> -->
          </v-col>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </v-flex>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      videoData: [],
    };
  },
  props: {
    videos: Array,
    category: String
  },
};
</script>

<style lang="scss">

</style>

