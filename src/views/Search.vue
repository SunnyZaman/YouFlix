<template>
  <div class="search-container">
    <div v-if="loading">
      <v-progress-circular :size="70" :width="7" color="red" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-row v-if="videos.length>0">
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
      <div v-else class="no-results-container">
        <p>Your search for "{{$route.params.q}}" did not have any matches.</p>
        <p>Suggestions:</p>
        <ul>
          <li v-for="suggestion in suggestions" :key="suggestion">{{suggestion}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeGet from "../services/youtubeGet";
import { of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  // finalize,
  map,
  switchMap
} from "rxjs/operators";

export default {
  data() {
    return {
      loaded: true,
      videos: [],
      youtubeGet: new YouTubeGet(),
      suggestions: [
        "Try different keywords",
        "Looking for a video or channel?",
        "Try a genre, like comedy, romance, sports, or drama"
      ]
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
        .subscribe({
          complete: () => {
            this.loading = false;
          }
        });
    }
  },
  mounted() {
    this.getSearchResults(this.$route.params.q).subscribe({
      complete: () => {
        this.loading = false;
      }
    });
  },
  methods: {
    queryChange() {
      return of(this.$route.params.q);
    },
    getSearchResults(query) {
      const searchEP = process.env.VUE_APP_SEARCH_ENDPOINT;
      this.loading = true;
      return this.youtubeGet
        .getVideos(searchEP, `part=snippet&type=video&q=${query}&maxResults=24`)
        .pipe(
          map(res => {
            this.videos = res.items;
          })
          // finalize(() => {
          //   this.loading = false;
          // })
        );
    }
  }
};
</script>

<style lang="scss">
.search-container {
  margin-top: 48px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.no-results-container {
  margin-top: 48px;
}
</style>