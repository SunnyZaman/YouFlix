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

import { concat, of } from "rxjs";
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
    //     async function getUserAsync(name)
    // {
    //   let response = await fetch(`https://api.github.com/users/${name}`);
    //   let data = await response.json()
    //   return data;
    // }

    // getUserAsync('yourUsernameHere')
    //   .then(data => console.log(data));
    init() {
      // this.getTrendingVideos().then(data => {
      //   this.featuredVideo = data.items[0];
      //   const vids = data.items;
      //   console.log(vids);

      //   while (vids.length > 0) {
      //     this.trending.push(vids.splice(0, 5));
      //   }
      //   console.log(this.trending);

      //   console.log(data);
      // });
      this.getVideoCategories();

      //  this.fetchPigeons().then(() => console.log(this.featuredVideo));

      // fetch(
      //   `${process.env.VUE_APP_VIDEO_ENDPOINT}?key=${process.env.VUE_APP_API_KEY}&part=snippet&chart=mostPopular&maxResults=35`
      // )
      //   .then(res => {
      //     return res.json();
      //   })
      //   .then(this.setResults);

      // Promise.all([
      //   fetch(url1).then(value => value.json()),
      //   fetch(url2).then(value => value.json())
      //   ])
      //   .then((value) => {
      //      console.log(value)
      //     //json response
      //   })
      //   .catch((err) => {
      //       console.log(err);
      //   });
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
          this.featuredVideo = res.items[0];
          this.trending = res.items;
        })
      );
      const gaming$ = this.getVideos(
        searchEP,
        "part=snippet&type=video&videoCategoryId=20&maxResults=36"
      ).pipe(
        map(res => {
          this.gaming = res.items;
        })
      );
      const obsArray$ = [trending$, gaming$];
      concat(...obsArray$).subscribe({
        complete: () => {
          this.dataLoaded = true;
        }
      });
    },
    //     async fetchPigeons(){
    //     const fetchCall = await fetch(`${process.env.VUE_APP_VIDEO_ENDPOINT}?key=${process.env.VUE_APP_API_KEY}&part=snippet&chart=mostPopular&maxResults=35`)
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log(res.items); // Here I get what I need
    //         this.featuredVideo = res.items[0];
    //     })
    //     return fetchCall;
    // },
    getVideos(endpoint, filter) {
      const url = `${endpoint}?key=${process.env.VUE_APP_API_KEY}&${filter}`;
      return ajax.getJSON(url).pipe(
        map(response => response),
        catchError(error => of(error))
      );
      // let response = await fetch(
      //   `${process.env.VUE_APP_VIDEO_ENDPOINT}?key=${process.env.VUE_APP_API_KEY}&part=snippet&chart=mostPopular&maxResults=35`
      // );

      // return response.json();
    }
    // setResults(results) {
    //   console.log(JSON.parse(JSON.stringify(results.items)));
    //   this.featuredVideo = results.items[0];
    //   console.log(JSON.parse(JSON.stringify(results.items)));
    //   const vids = JSON.parse(JSON.stringify(results.items));
    //   while (vids.length > 0) {
    //     this.trending.push(vids.splice(0, 5));
    //   }
    //   console.log(this.trending);
    //   this.trending = JSON.parse(JSON.stringify(this.trending));
    //   console.log(this.trending);
    // }
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