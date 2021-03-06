import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from "../views/Auth/Login";
import PageNotFound from '../views/Errors/PageNotFound';

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '*',
        component: PageNotFound
    }
];

export const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }

    next();
});
