<template>
  <v-container fluid v-if="videos.length>0">
    <v-subheader>{{category}}</v-subheader>
    <v-carousel height="auto" hide-delimiters>
      <v-carousel-item v-for=" i in slides" :key="i">
        <v-row class="video-container">
          <v-col
            class="pa-1"
            v-for="(video,j) in videos.slice((i-1)*videosPerSlide,videosPerSlide*i)"
            :key="category+i+j"
            xl="2"
            lg="2"
            md="3"
            sm="4"
            cols="6"
          >
            <router-link :to="{ name: 'watch', params: { v: getParams(video.id) }}">
              <v-card class="video-card" height="150">
                <v-img :src="video.snippet.thumbnails.high.url" width="100%" height="100%"></v-img>
                <div class="video-overlay">
                  <p>{{video.snippet.title}}</p>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      slides: 6,
      videosPerSlide: 6
    };
  },
  props: {
    videos: Array,
    category: String
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
    this.responsiveCarouselCheck(window.innerWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      this.responsiveCarouselCheck(window.innerWidth);
    },
    responsiveCarouselCheck(screenWidth) {
      if (screenWidth < 600) {
        this.slides = 18;
        this.videosPerSlide = 2;
      } else if (screenWidth >= 600 && screenWidth < 960) {
        this.slides = 12;
        this.videosPerSlide = 3;
      } else if (screenWidth >= 960 && screenWidth < 1264) {
        this.slides = 9;
        this.videosPerSlide = 4;
      } else {
        this.slides = 6;
        this.videosPerSlide = 6;
      }
    },
    getParams(videoId) {
      if (typeof videoId === "string") {
        return videoId;
      } else {
        return videoId.videoId;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-subheader {
  color: #ffffff !important;
  font-size: 1.3em;
  padding: 0;
  position: relative;
  z-index: 1;
}
</style>

