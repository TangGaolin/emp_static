import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const Login     = resolve  => require(['../pages/Login'], resolve)
const Layout    = resolve  => require(['../pages/Layout'], resolve)
const User      = resolve  => require(['../pages/Users'], resolve)
const Order     = resolve  => require(['../pages/OrderList'], resolve)
const Mine      = resolve  => require(['../pages/Mine'], resolve)
const UpdatePassword      = resolve  => require(['../pages/UpdatePassword'], resolve)

const UserInfo      = resolve  => require(['../pages/UserInfo'], resolve)
const OrderInfo      = resolve  => require(['../pages/OrderInfo'], resolve)
const UserItems      = resolve  => require(['../pages/UserItems'], resolve)
const UserOrderList      = resolve  => require(['../pages/UserOrderList'], resolve)
const UserUseOrderList      = resolve  => require(['../pages/UserUseOrderList'], resolve)
const UpdateEmp      = resolve  => require(['../pages/UpdateEmp'], resolve)
const Shop      = resolve  => require(['../pages/Shop'], resolve)

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: "/user",
            component: Layout,
            redirect: '/user/user-list',
            name: 'user',
            children: [
                {
                    name: "users",
                    path: "user-list",
                    component: User
                },
                {
                    name: "useInfo",
                    path: "user-info",
                    component: UserInfo
                },
                {
                    name: "useItem",
                    path: "user-item",
                    component: UserItems
                },
                {
                    name: "userOrder",
                    path: "user-order",
                    component: UserOrderList
                },
                {
                    name: "userUseOrder",
                    path: "user-useorder",
                    component: UserUseOrderList
                },
                {
                    name: "userEmp",
                    path: "user-emp",
                    component: UpdateEmp
                },
            ]
        },
        {
            path: "/order",
            component: Layout,
            redirect: '/order/order-list',
            name: 'order',
            children: [
                {
                    name: "orders",
                    path: "order-list",
                    component: Order
                },
                {
                    name: "orderInfo",
                    path: "order-info",
                    component: OrderInfo
                }
            ]
        },
        {
            path: "/shop",
            component: Layout,
            redirect: '/shop/shop-data',
            name: 'shop',
            children: [
                {
                    name: "shopData",
                    path: "shop-data",
                    component: Shop
                },
            ]
        },
        {
            path: "/mine",
            component: Layout,
            redirect: '/mine/mine-info',
            name: 'mine',
            children: [
                {
                    name: "mines",
                    path: "mine-info",
                    component: Mine
                },
                {
                    name: "update-pwd",
                    path: "update-password",
                    component: UpdatePassword
                }
            ]
        },
        {
            path: '/',
            component: Layout,
            redirect: '/user'
        },

    ]
})

router.beforeEach((to, from, next) => {
    var account = store.state.account
    if(to.path === '/login') {
        return next()
    }
    if (!account.empInfo) {
        return next('/login')
    }else {
        return next()
    }
})

router.afterEach(transition => {

});

export default router
