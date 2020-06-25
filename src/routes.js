import Vue from 'vue'
import VueRouter from 'vue-router'
import Browse from './views/Browse'
import Watch from './views/Watch'
import Search from './views/Search'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        { path: '', component: Browse},
        { path: '/browse', component: Browse},
        { path: '/watch/:v',  name: 'watch', component: Watch},
        { path: '/search/:q',  name: 'search', component: Search}

    ]
})