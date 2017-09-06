<style scoped>
</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="卡项列表">
            <router-link :to="'user-info?uid='+$route.query.uid" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <br/>
        <yd-infinitescroll :callback="getUserItemData" ref="lsdemo">
            <yd-list theme="4" slot="list">
                <yd-cell-group v-for="item in itemData" :key = "item.id">
                    <yd-cell-item style="font-weight: bolder">
                        <span slot="left">项目名称</span>
                        <span slot="right">{{ item.item_name }}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">购买价格</span>
                        <span slot="right">{{ item.sold_money }}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">购买折扣</span>
                        <span slot="right">{{ item.discount }}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">总次数</span>
                        <span slot="right">{{ item.times }}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">剩余次数</span>
                        <span slot="right">{{ item.times - item.used_times }}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">购买时间</span>
                        <span slot="right">{{ item.add_time }}</span>
                    </yd-cell-item>
                </yd-cell-group>
            </yd-list>
             <!--数据全部加载完毕显示-->
            <span slot="doneTip">没有更多数据啦~</span>
        </yd-infinitescroll>

        <yd-backtop></yd-backtop>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getUserItemList } from '../api/api'
    export default {
        data () {
            return {
                itemData: [],
                cur_page:1,
                limit: 10
            }
        },
        created() {
            this.getUserItemData()
        },

        methods: {
            getUserItemData () {
                getUserItemList({
                    uid: this.$route.query.uid,
                    limit: this.limit,
                    cur_page: this.cur_page
                }).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    }else{
                        const _list = response.data.data
                        this.itemData = [...this.itemData, ..._list]
                        if (_list.length < this.limit || Math.ceil(response.data.totalSize / this.limit) <= this.page) {
                            // 所有数据加载完毕
                            this.$refs.lsdemo.$emit('ydui.infinitescroll.loadedDone')
                            return
                        }
                        // 单次请求数据完毕
                        this.$refs.lsdemo.$emit('ydui.infinitescroll.finishLoad')
                        this.cur_page++
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }

        }


    }
</script>
