import Vue from 'vue'
import VueRouter from 'vue-router'
import Fichier from './views/Fichier'
import Login from './views/Login'
import Logout from './views/Logout'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'fichier',
            component: Fichier,
            meta: {
                requiresLogin: true
              }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
        },
    ]
})