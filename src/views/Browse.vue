<template>
  <div>
    <Header></Header>
    <Hero :featuredVideo="featuredVideo" />
    <div class="carousels-container">
      <Carousel v-if="dataLoaded" :category="'Popular on YouTube'" :videos="trending" />
      <Carousel v-if="dataLoaded" :category="'Trending Now'" :videos="trending" />
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import Hero from "../components/Hero";

import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError, finalize } from "rxjs/operators";

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
      this.getTrendingVideos()
        .pipe(
          map(res => {
            this.dataLoaded = false;
            console.log("the results: ", res);
            this.featuredVideo = res.items[0];
            console.log(this.featuredVideo);

            this.trending = res.items;
            // while (vids.length > 0) {
            //   this.trending.push(vids.splice(0, 5));
            // }
          }),
          finalize(() => {
            this.dataLoaded = true;
          })
        )
        .subscribe();

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
    //     async fetchPigeons(){
    //     const fetchCall = await fetch(`${process.env.VUE_APP_VIDEO_ENDPOINT}?key=${process.env.VUE_APP_API_KEY}&part=snippet&chart=mostPopular&maxResults=35`)
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log(res.items); // Here I get what I need
    //         this.featuredVideo = res.items[0];
    //     })
    //     return fetchCall;
    // },
    getTrendingVideos() {
      const url = `${process.env.VUE_APP_VIDEO_ENDPOINT}?key=${process.env.VUE_APP_API_KEY}&part=snippet&chart=mostPopular&maxResults=36`;
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