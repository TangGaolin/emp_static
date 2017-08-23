<style>


</style>
<template>
    <div class="to-button">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">业绩单据</mt-tab-item>
            <mt-tab-item id="2">消耗单据</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 10" :key = "n" :title="'内容 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :key = "n" :title="'测试 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    export default {
        name: 'page-navbar',
        data() {
            return {
                selected: '1'
            };
        }
    };
</script>