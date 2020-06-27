<template>
  <div class="search-container">
    <v-row>
      <v-col
        class="pa-1"
        v-for="(video,j) in videos"
        :key="'videso'+j"
        xl="2"
        lg="2"
        md="3"
        sm="4"
        cols="6"
      >
        <router-link :to="{ name: 'watch', params: { v: video.id.videoId }}">
          <v-card class="video-card" height="150">
            <v-img :src="video.snippet.thumbnails.high.url" width="100%" height="100%"></v-img>
            <div class="video-overlay">
              <p>{{video.snippet.title}}</p>
            </div>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import YouTubeGet from "../services/youtubeGet";
import { of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from "rxjs/operators";

export default {
  data() {
    return {
      videos: [],
      youtubeGet: new YouTubeGet()
    };
  },
  watch: {
    "$route.params.q"() {
      this.queryChange()
        .pipe(
          switchMap(query => {
            return this.getSearchResults(query);
          }),
          debounceTime(1000),
          distinctUntilChanged()
        )
        .subscribe();
    }
  },
  mounted() {
    this.getSearchResults(this.$route.params.q).subscribe();
  },
  methods: {
    queryChange() {
      return of(this.$route.params.q);
    },
    getSearchResults(query) {
      const searchEP = process.env.VUE_APP_SEARCH_ENDPOINT;
      return this.youtubeGet
        .getVideos(searchEP, `part=snippet&type=video&q=${query}&maxResults=24`)
        .pipe(
          map(res => {
            this.videos = res.items;
          })
        );
    }
  }
};
</script>

<style lang="scss">
.search-container {
  margin-top: 48px;
  padding: 0 50px;
}
</style>