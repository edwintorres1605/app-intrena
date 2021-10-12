import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../app/App.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Agenda',
        component: App
    },
    {
        path: '/cursos',
        name: 'Cursos',
        component: () => import('../app/cursos/Cursos.vue')
    },
    {
        path: '/usuarios',
        name: 'Usuarios',
        component: () => import('../app/usuarios/Usuarios.vue')
    },

    {
        path: '/roles',
        name: 'Roles',
        component: () => import('../app/roles/Roles.vue')
    },

    {
        path: '/permisos',
        name: 'Permisos',
        component: () => import('../app/permisos/Permisos.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

