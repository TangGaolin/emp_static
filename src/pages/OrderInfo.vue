<style>
    .yd-backtop {
        bottom: 10%;
    }
</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="单据详情">
            <router-link to="/order/order-list" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

    </div>
</template>



<script type="text/babel">
    import { mapGetters } from 'vuex'
    import { getUsers } from '../api/api'
    export default {
        data() {
            return {

            }
        },

        created() {
            console.log('xxxx')
        },
        methods: {

        }

    };
</script>