<template>
  <div>
    <Header></Header>
    <Hero :featuredVideo="featuredVideo" />
    <div v-if="dataLoaded" class="carousels-container">
      <Carousel :category="'Trending Now'" :videos="trending" />
      <Carousel :category="'Gaming'" :videos="gaming" />
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import Hero from "../components/Hero";

import { forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";

export default {
  components: {
    Carousel,
    Header,
    Hero
  },
  data() {
    return {
      featuredVideo: null,
      trending: [],
      gaming: [],
      dataLoaded: false
    };
  },
  methods: {
    init() {
      this.getVideoCategories();
    },
    getVideoCategories() {
      this.dataLoaded = false;
      const videoEP = process.env.VUE_APP_VIDEO_ENDPOINT;
      const searchEP = process.env.VUE_APP_SEARCH_ENDPOINT;
      const trending$ = this.getVideos(
        videoEP,
        "part=snippet&chart=mostPopular&maxResults=36"
      ).pipe(
        map(res => {
          console.log(res);
          
          this.featuredVideo = res.items[0];
          this.trending = res.items;
        })
      );
      const gaming$ = this.getVideos(
        searchEP,
        "part=snippet&type=video&videoCategoryId=20&maxResults=36"
      ).pipe(
        map(res => {
          console.log(res);
          
          this.gaming = res.items;
        })
      );
      const obsArray$ = [trending$, gaming$];
      forkJoin(...obsArray$).subscribe({
        complete: () => {
          this.dataLoaded = true;
        }
      });
    },
    getVideos(endpoint, filter) {
      const url = `${endpoint}?key=${process.env.VUE_APP_API_KEY}&${filter}`;
      return ajax.getJSON(url).pipe(
        map(response => response),
        catchError(error => of(error))
      );
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