<template>
    <div class="page-tabbar">
        <div class="page-wrap">
            <mt-tab-container class="page-tabbar-container" v-model="selected">
                <mt-tab-container-item id="会员">
                    <Users></Users>
                </mt-tab-container-item>

                <mt-tab-container-item id="单据流水">
                    <OrderList></OrderList>
                </mt-tab-container-item>


                <mt-tab-container-item id="我的">
                    <Mine></Mine>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>

        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="会员">
                <img slot="icon" src="../assets/user.png">
                会员
            </mt-tab-item>

            <mt-tab-item id="单据流水">
                <img slot="icon" src="../assets/list.png">
                单据流水
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="../assets/mine.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'page-tabbar',
        data() {
            return {
                selected: '会员'
            };
        }
    };
</script>

<style>
    .page-tabbar {
        overflow: hidden;
        height: 100vh;
    }
    .page-wrap {
        overflow: auto;
        height: 100%;
        padding-bottom: 100px;
    }
</style>