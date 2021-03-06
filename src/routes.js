import Vue from 'vue'
import VueRouter from 'vue-router'
import Fichier from './views/Fichier'
import Login from './views/Login'
import Logout from './views/Logout'
import Menu from './views/Menu'
import Recuperer from './views/Recuperer'
import Finess from './views/Finess'
import Resultat from './views/Resultat'
import Codage from './views/Codage'
import Choix from './views/choix_rss'


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
        {
            path: '/menu',
            name: 'menu',
            component: Menu,
            meta: {
                requiresLogin: true
              }
        },
        {
            path: '/recuperer',
            name: 'recuperer',
            component: Recuperer,
            meta: {
                requiresLogin: true
              }
        },
        {
            path: '/finess',
            name: 'finess',
            component: Finess,
            meta: {
                requiresLogin: true
              }
        },
        {
            path: '/resultat',
            name: 'resultat',
            component: Resultat,
            meta: {
                requiresLogin: true
              }
        },
        {
            path: '/codage',
            name: 'codage',
            component: Codage,
            meta: {
                requiresLogin: true
              }
        },
        {
            path: '/choix',
            name: 'choix',
            component: Choix,
            meta: {
                requiresLogin: true
              }
        },

    ]
})