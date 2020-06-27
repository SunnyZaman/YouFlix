<template>
  <div v-if="dataLoaded" >
    <Hero :featuredVideo="categories[0].videos[0]"/>
    <div class="carousels-container">
      <Carousel  v-for="category in categories" :key="category.title"
      :category="category.title" :videos="category.videos"/>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import Hero from "../components/Hero";

import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import YouTubeGet from "../services/youtubeGet";

export default {
  components: {
    Carousel,
    Hero
  },
  data() {
    return {
      categories: [
        {
          title: "Trending Now",
          videos: [],
          endPoint: process.env.VUE_APP_VIDEO_ENDPOINT,
          parameters: "part=snippet&chart=mostPopular&maxResults=36"
        },
        {
          title: "Music",
          videos: [],
          endPoint: process.env.VUE_APP_SEARCH_ENDPOINT,
          parameters: "part=snippet&type=video&videoCategoryId=10&maxResults=36"
        },
        {
          title: "Gaming",
          videos: [],
          endPoint: process.env.VUE_APP_SEARCH_ENDPOINT,
          parameters: "part=snippet&type=video&videoCategoryId=20&maxResults=36"
        },
        {
          title: "Trailers",
          videos: [],
          endPoint: process.env.VUE_APP_SEARCH_ENDPOINT,
          parameters: "part=snippet&type=video&videoCategoryId=44&maxResults=36"
        },
        {
          title: "News & Politics",
          videos: [],
          endPoint: process.env.VUE_APP_SEARCH_ENDPOINT,
          parameters: "part=snippet&type=video&videoCategoryId=25&maxResults=36"
        }
      ],
      dataLoaded: false,
      youtubeGet: new YouTubeGet()
    };
  },
  methods: {
    init() {
      this.getVideoCategories();
    },
    getVideoCategories() {
      this.dataLoaded = false;
      const obsArray$ = [];
      this.categories.forEach(category=>{
        const result$ = this.youtubeGet
        .getVideos(category.endPoint, category.parameters)
        .pipe(
          map(res => {
            category.videos = res.items;
          })
        );
        obsArray$.push(result$);
      });
      forkJoin(...obsArray$).subscribe({
        complete: () => {
          this.dataLoaded = true;
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.carousels-container {
  margin-top: -80px;
}
</style>