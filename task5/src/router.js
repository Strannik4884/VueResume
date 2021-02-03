import Vue from 'vue'
import VueRouter from 'vue-router'
import ResumeMain from "@/components/ResumeMain";
import ResumeEdit from "@/components/ResumeEdit";
import ResumeAdd from "@/components/ResumeAdd";

Vue.use(VueRouter)

const routes = [
    { path: '/', component: ResumeMain },
    { path: '/add', component: ResumeAdd },
    { path: '/edit/:id', component: ResumeEdit }
]

export default new VueRouter({
    mode: 'history',
    routes
})