<style scoped>

</style>
<template>
    <yd-layout>
        <div>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>

        <yd-tabbar slot="tabbar" v-if="['users','orders','mines'].indexOf(currentPage) >= 0">
            <yd-tabbar-item title="会员" link="/user" :active="'users' == currentPage">
                <yd-icon name="phone2" slot="icon" size="0.54rem" ></yd-icon>
            </yd-tabbar-item>

            <yd-tabbar-item title="单据流水" link="/order" :active="'orders' == currentPage">
                <yd-icon name="order" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="我" link="/mine" :active = "'mines' == currentPage">
                <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>
    </yd-layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                currentPage: ""
            }
        },
        watch: {
            // 如果路由有变化，清空相关数据
            '$route': 'changeRouter'
        },
        created() {
            this.changeRouter()
        },
        methods: {
            changeRouter() {
                this.currentPage = this.$route.name
            }

        }
    }
</script>
