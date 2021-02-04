import Vue from 'vue'
import VueRouter from 'vue-router'
import ResumeMain from "@/components/ResumeMain";
import ResumeEdit from "@/components/ResumeEdit";
import ResumeAdd from "@/components/ResumeAdd";
import NotFoundPage from "@/components/NotFoundPage";

Vue.use(VueRouter)

const routes = [
    {path: '/', name: 'home', component: ResumeMain},
    {path: '/add', name: 'add', component: ResumeAdd},
    {path: '/edit/:id', name: 'edit', component: ResumeEdit},
    {path: '*', name: 'error', component: NotFoundPage}
]

export default new VueRouter({
    mode: 'history',
    routes
})