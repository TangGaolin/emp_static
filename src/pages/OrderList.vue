<style>
    .yd-backtop {
        bottom: 10%;
    }
</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="单据流水">
        </yd-navbar>

        <yd-infinitescroll :callback="getEmpOrderList" ref="lsdemo">

            <yd-list theme="4" slot="list">
                <yd-cell-item v-for="item in userList" arrow type="link" :href="'order-info?order_id='+item.order_id + '&from_type='+item.from_type + '&order_desc='+item.order_desc"  :key="item.id">
                    <span slot="left"> {{ item.order_desc }} </span>
                    <span slot="right"> {{ item.add_time }} </span>
                </yd-cell-item>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有更多数据啦~</span>
        </yd-infinitescroll>
        <yd-backtop style="bottom: 10%"></yd-backtop>
    </div>
</template>



<script type="text/babel">
    import { mapGetters } from 'vuex'
    import { getUsers, getEmpOrderList } from '../api/api'
    export default {
        data() {
            return {
                userList: [],
                cur_page:1,
                limit: 15
            }
        },
        computed: {
            ...mapGetters([
                'empInfo',
            ])
        },
        created() {
            this.getEmpOrderList()
        },
        methods: {
            getEmpOrderList() {
                let query = {
                    limit: this.limit,
                    cur_page: this.cur_page
                }
                if("店长" === this.empInfo.job) {
                    query['shop_id'] = this.empInfo.shop_id
                }else{
                    query['emp_id'] = this.empInfo.emp_id
                }

                getEmpOrderList(query).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    } else {
                        const _list = response.data.data
                        this.userList = [...this.userList, ..._list]
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

    };
</script>