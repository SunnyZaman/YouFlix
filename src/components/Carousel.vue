<template>
  <v-flex v-if="trendingData.length>0">
    <!-- {{trendingData}} -->
    <h2>Trending Now {{trendingData.length}}</h2>
    <v-carousel>
      <v-carousel-item v-for="(n, i) in 7" :key="i">
        <v-layout row>
          <v-flex
            v-for="(m, j) in 5"
            :key="trendingData[i][j].snippet.thumbnails.high.url"
            pl-2
            pr-2
          >
            <v-card>
              <!-- {{trending[j].snippet.thumbnails.default.url}} -->
              <v-img :src="trending[i][j].snippet.thumbnails.high.url" width="266" height="200"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{j+i}}</h3>
                  <div>Card text</div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </v-flex>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      trendingData: this.trending
    };
  },
  props: {
    trending: Array
  },
  created() {
    console.log("Asausajncjasc", this.trendingData);
  },
  mounted() {
    console.log("so trendy: ", this.trending);

    this.$nextTick(() => {
      console.log("so trendy: ", [...this.trending]);
    });
  },
  updated() {
    console.log("not trending: ", this.trending);
  }
};
</script>

<style>
</style>