<template>
  <v-flex v-if="trendingData.length>0">
    <!-- {{trendingData}} -->
    <h2>Trending Now {{trendingData.length}}</h2>

    <vueper-slides class="no-shadow"
    :touchable="false"
  :visible-slides="5"
  slide-multiple
  :slide-ratio="1 / 10"
  :gap="2"
  :arrows-outside="false">
      <vueper-slide
        v-for="(slide, i) in trendingData"
        :key="i"
        :image="trending[i].snippet.thumbnails.high.url"
      >
      <template v-slot:content>
      <div class="vueperslide__content-wrapper" :style="'background-color: rgba(0,0,0,0.3)'">
        <div class="vueperslide__title">{{ i.toString() }}</div>
      <p>weerthb</p>
      </div>
    </template>
      </vueper-slide>
    </vueper-slides>

    <!-- <v-carousel>
      <v-carousel-item v-for="(n, i) in 7" :key="i">
        <v-layout row>
          <v-flex
            v-for="(m, j) in 5"
            :key="trendingData[i][j].snippet.thumbnails.high.url"
            pl-2
            pr-2
          >
            <v-card>
              <v-img :src="trending[i][j].snippet.thumbnails.high.url" width="266" height="200"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{j+i}}</h3>
                  <div>Card text</div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-carousel-item>
    </v-carousel>-->
  </v-flex>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "Carousel",
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      trendingData: this.trending,
      slides: [
        {
          title: "Slide #1",
          content: "Slide content."
        },
        {
          title: "Slide #2",
          content: "Slide content."
        },
        {
          title: "Slide #3",
          content: "Slide content."
        },
        {
          title: "Slide #4",
          content: "Slide content."
        },
      ]
    };
  },
  props: {
    trending: Array
  },
  created() {
    console.log("Asausajncjasc", this.trendingData);
  },
  mounted() {
    console.log("so trendy: ", this.trending);

    this.$nextTick(() => {
      console.log("so trendy: ", [...this.trending]);
    });
  },
  updated() {
    console.log("not trending: ", this.trending);
  }
};
</script>

<style scoped>
.vueperslide:hover{
  background-color: rgba(0, 0, 0, 0.9);
}
</style>

