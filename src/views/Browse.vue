<template>
  <div>
    <Header/>
    <Hero :featuredVideo="featuredVideo"/>
    <Carousel :trending="trending"/>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default {
  components: {
    Carousel,
    Header,
    Hero
  },
  data () {
    return {
      featuredVideo: null,
      trending:null
    }
  },
  methods:{
    init(){
       fetch(`${process.env.VUE_APP_VIDEO_ENDPOINT}?key=${process.env.VUE_APP_API_KEY}&part=snippet&chart=mostPopular&maxResults=35`)
          .then(res => {
            return res.json();
          }).then(this.setResults);

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
    setResults (results) {
      console.log(JSON.parse(JSON.stringify(results.items)));
      this.featuredVideo = results.items[0];
            console.log(JSON.parse(JSON.stringify(results.items)));

      this.trending = JSON.parse(JSON.stringify(results.items));      
    }
  },
  mounted(){
    this.init()
  }
};
</script>

<style>
</style>