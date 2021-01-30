import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
    linkExactActiveClass: "active",
    mode: "history",
    routes: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./pages/login.vue'),
        },
        {
            path: '',
            name: 'dashboard',
            meta:{
                auth:true
            },
            component: () => import('./pages/dashboard.vue'),
          },
          {
            path: '/kasbon/:id',
            name: 'kasbon',
            meta:{
                auth:true
            },
            component: () => import('./pages/kasbon.vue'),
          }
      ],
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)){
        
        if(localStorage.getItem('user')){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})

export default router;