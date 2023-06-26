import {createRouter, createWebHistory} from 'vue-router'
import ListOfEmployers from '../views/ListOfEmployers.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ListOfEmployers
        },
    ]
})

export default router
