import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve  => require(['../pages/Login'], resolve)
const Index = resolve  => require(['../pages/Index'], resolve)

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            component: Index,
            name: '首页'
        }
    ]
})
//
//
// router.beforeEach((to, from, next) => {
//     // var account = store.state.account
//     // console.log(store.state.account)
//     //
//     // if(to.path === '/login') {
//     //     return next()
//     // }
//     //
//     // if (typeof(account.userInfo) === "undefined") {
//     //     return next(`/login?redirect=${encodeURIComponent(to.path)}`)
//     // }else {
//     //     return next()
//     // }
// })
//
// router.afterEach(transition => {
//
// });

export default router
