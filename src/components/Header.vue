<template>
  <div>
    <v-app-bar color="rgba(0,0,0,0.1)" dense dark fixed elevation="0" id="header">
      <v-btn text depressed href="#/browse">
        <v-img :src="require('@/assets/logo-small.png')" max-height="30" max-width="35" contain></v-img>
        <v-img
          class="mx-2"
          :src="require('@/assets/logo.png')"
          max-height="50"
          max-width="100"
          contain
        ></v-img>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        :outlined="isOutlined"
        solo
        dense
        :flat="isFlat"
        single-line
        hide-details
        class="shrink"
        :background-color="backgroundColor"
        color="rgb(229,9,20)"
        @click:prepend-inner="searchCheck"
        :prepend-inner-icon="searching?'mdi-close-circle':'mdi-magnify'"
        @focus="focus"
        @focusout="focusOut"
        v-model="searchValue"
        change="event => searchChange(event)"
      ></v-text-field>

      <v-menu left bottom open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="avatar-button mx-2"></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Logged in as Guest</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      searchValue: "",
      textField: null,
      inputField: null,
      isOutlined: false,
      backgroundColor: "transparent",
      searching: false,
      isFlat: true
    };
  },
  mounted() {
    this.textField = document.getElementsByClassName("v-text-field")[0];
    this.inputField = this.textField.querySelector("input");
    this.footerCheck();
    this.checkSearchQuery();
  },
  watch: {
    searchValue() {
      this.searchChange(this.searchValue);
    },
    "$route.path"() {
      this.pathChange();
    }
  },
  methods: {
    searchCheck() {
      if (this.searching) {
        this.searchValue = "";
        this.focusOut();
      } else {
        this.inputField.focus();
      }
    },
    focus() {
      this.backgroundColor = "black";
      this.textField.style.width = "300px";
      this.isFlat = false;
      this.isOutlined = true;
      this.searching = true;
    },
    focusOut() {
      if (this.searchValue === "") {
        this.backgroundColor = "transparent";
        this.textField.style.width = "40px";
        this.isFlat = true;
        this.isOutlined = false;
        this.searching = false;
        this.inputField.blur();
      }
    },
    searchChange(value) {
      if (value !== undefined) {
        if (value === "") {
          this.$router.push("/browse").catch(err => console.log(err));
        } else {
          this.$router
            .replace({
              name: "search",
              params: { q: this.searchValue }
            })
            .catch(err => console.log(err));
        }
      }
    },
    pathChange() {
      this.footerCheck();
      if (!this.$route.path.includes("search")) {
        this.searchValue = "";
        this.focusOut();
      }
    },
    footerCheck() {
      const footer = document.querySelector("footer");
      if (this.$route.path.includes("watch")) {
        footer.style.display = "none";
      } else {
        footer.style.display = "flex";
      }
    },
    checkSearchQuery() {
      const route = this.$route;
      if (route.path !== "/search") {
        if (route.params.q !== "" && route.params.q !== undefined) {
          this.searchValue = route.params.q;
          this.focus();
        }
      }
    }
  }
};
</script>
<style scoped>
#header {
  transition: all 0.2s ease-in-out;
}
.v-text-field {
  width: 40px;
  transition: all 0.2s;
  border: none;
}
.avatar-button {
  height: 30px !important;
  min-width: 30px !important;
  background-image: url("~@/assets/avatar.png");
  background-size: cover;
}
</style>