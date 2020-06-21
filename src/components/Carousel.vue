<template>
  <v-container fluid v-if="videos.length>0">
    <!-- {{trendingData}} -->
    <v-subheader>{{category}}</v-subheader>
    <v-carousel height="auto" delimiter-icon="mdi-minus" hide-delimiters>
      <v-carousel-item v-for=" i in slides" :key="i">
        <v-row>
          <v-col
            class="pa-1"
            v-for="(j,k) in videos.slice((i-1)*videosPerSlide,videosPerSlide*i)"
            :key="category+i+k"
            xl="2"
            lg="2"
            md="3"
            sm="4"
            cols="6"
          >
            <!-- {{j}} -->
            <!-- {{i}} -->
            <!-- <v-card> -->
            <v-img :src="j.snippet.thumbnails.high.url" width="100%" height="115px"></v-img>
            <!-- <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{j+i}}</h3>
                  <div>Card text</div>
                </div>
            </v-card-title>-->
            <!-- </v-card> -->
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
      // console.log("this is the e: ", e);
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
  z-index: 500;
}

// .v-carousel__controls {
//   justify-content: flex-end !important;
//   top: 0 !important;
//   background: none !important;

//   .v-carousel__controls__item {
//     margin: 0 2px !important;
//     padding: 0 9px !important;
//   }
//   .v-btn--icon.v-size--small {
//     height: 9px !important;
//     width: 11px !important;
//   }
//   .v-btn--icon.v-size--small .v-icon {
//     height: 1px !important;
//   }
//   .v-btn--round {
//     border-radius: 0 !important;
//   }
// }
</style>

