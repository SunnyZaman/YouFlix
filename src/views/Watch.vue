<template>
  <div>
    <iframe
      id="video"
      src="//www.youtube.com/embed/5iiPC-VGFLU?rel=0&autoplay=1"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {
    window.addEventListener("resize", this.myEventHandler);
    this.videoResize(window.innerWidth, window.innerHeight);
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
      video.style.height = screenHeight + "px";
    }
  }
};
</script>

<style lang="scss">
</style>