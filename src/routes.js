import Vue from 'vue'
import VueRouter from 'vue-router'
import Browse from './views/Browse'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        { path: '', component: Browse},
        { path: '/browse', component: Browse}
    ]
})