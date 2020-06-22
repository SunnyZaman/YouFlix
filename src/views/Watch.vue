<template>
  <div id="video-container">
    <Header></Header>
    <iframe id="video" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  components: {
    Header
  },
  mounted() {
    this.createVideoFrame();
    window.addEventListener("resize", this.myEventHandler);
    // this.videoResize(window.innerWidth, window.innerHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      this.videoResize(window.innerWidth, window.innerHeight);
    },
    videoResize(screenWidth, screenHeight) {
      const video = document.getElementById("video");
      video.style.width = screenWidth + "px";
      video.style.height = (screenHeight-55) + "px";
    },
    createVideoFrame() {
      console.log(this.$route);
      this.videoId = this.$route.params.v;
      const src = `https://www.youtube.com/embed/${this.videoId}?rel=0&autoplay=1&mute=1&enablejsapi=1`;
      const video = document.getElementById("video");
      video.style.marginTop = "48px";
      video.src = src;
      this.videoResize(window.innerWidth, window.innerHeight);
    }
  }
};
</script>

<style lang="scss">
#video-container{
 background-color: #000000 !important;
}
</style>