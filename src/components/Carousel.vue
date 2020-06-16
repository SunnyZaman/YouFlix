<template>
  <v-flex v-if="trending!==null  && trending!==undefined && trending && trending.length>0">
    <h2>Trending Now {{trending.length}}</h2>
    <v-carousel>
      <v-carousel-item v-for="(n, i) in 7" :key="i">
        <v-layout row>
          <v-flex  v-for="(m, j) in 5" :key="j" pl-2 pr-2>
            <v-card>
<!-- {{trending[j].snippet.thumbnails.default.url}} -->
              <!-- <v-img :src="trending[j+i].snippet.thumbnails.default.url"></v-img> -->
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
  props: ["trending"]
};
</script>

<style>
</style>