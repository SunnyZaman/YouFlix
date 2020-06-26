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
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

export default {
  data() {
    return {
      videos: [],
      youtubeGet: new YouTubeGet()
    };
  },
  watch: {
    "$route.params.q"() {
      this.queryChange();
    }
  },
  mounted() {
    console.log("route params: ", this.$route.params.q);
  },
  methods: {
    queryChange() {
      console.log("query change", this.$route.params.q);
      this.getSearchResults();
    },
    getSearchResults() {
      const query = this.$route.params.q;
      const searchEP = process.env.VUE_APP_SEARCH_ENDPOINT;
      console.log(query);
      this.youtubeGet
        .getVideos(searchEP, `part=snippet&type=video&q=${query}&maxResults=60`)
        .pipe(
          debounceTime(2000),
          distinctUntilChanged(),
          map(res => {
            this.videos = res.items;
          })
        )
        .subscribe();
    }
  }
};
</script>

<style lang="scss">
.search-container {
  margin-top: 48px;
}

//add this to global styling
// .video-card {
//   transition: all 0.2s;
//   &:hover {
//     transform: scale(1.5);
//     z-index: 1;
//     .video-overlay {
//       opacity: 1;
//       p {
//         padding-bottom: 20px;
//         padding-left: 5px;
//       }
//     }
//   }
//   .video-overlay {
//     opacity: 0;
//     position: absolute;
//     background: linear-gradient(
//       to top,
//       rgba(0, 0, 0, 0.9) 0%,
//       rgba(0, 0, 0, 0) 100%
//     );
//     top: 0;
//     bottom: 0;
//     width: 100%;
//     font-size: 10px;
//     display: flex;
//     justify-content: flex-start;
//     align-items: flex-end;
//     .video-play {
//       border-radius: 50%;
//     }
//   }
// }
</style>