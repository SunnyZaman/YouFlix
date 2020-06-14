<template>
  <div>
    <Header></Header>
    <Hero :featuredVideo="featuredVideo"></Hero>
  </div>
</template>

<script>
import Header from "../components/Header";
import Hero from "../components/Hero";

export default {
  components: {
    Header,
    Hero
  },
  data () {
    return {
      featuredVideo: null
    }
  },
  methods:{
    init(){
       fetch(`${process.env.VUE_APP_VIDEO_ENDPOINT}?key=${process.env.VUE_APP_API_KEY}&part=snippet&chart=mostPopular&maxResults=10`)
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
      this.featuredVideo = results.items[0]
      console.log("this is the results: ", results);
      
    }
  },
  mounted(){
    this.init()
  }
};
</script>

<style>
</style>