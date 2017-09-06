<style scoped xmlns="http://www.w3.org/1999/html">
</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="购买记录">
            <router-link :to="'user-info?uid='+$route.query.uid" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <br/>
        <yd-infinitescroll :callback="getUserOrderData" ref="lsdemo">
            <yd-list theme="4" slot="list">
                <yd-timeline class="demo-small-pitch">
                    <yd-timeline-item v-for="(item, index) in orderData" :key="index">
                        <p><b>消费类型</b>: {{ item.order_type_name }}</p>
                        <p><b>消费金额</b>: {{ item.pay_money }}</p>
                        <div v-if="item.remark.length > 0">
                            <label><b>跟踪记录</b>:</label>
                            <div v-for="(remark, index) in item.remark" :key="index">
                                <ul>
                                    <li> {{ '&#9758' + remark.remark }} </li>
                                </ul>
                            </div>
                        </div>
                        <p style="margin-top: 10px;"><b>交易时间</b>:{{ item.add_time }}</p>
                    </yd-timeline-item>
                </yd-timeline>
            </yd-list>
             <!--数据全部加载完毕显示-->
            <span slot="doneTip">没有更多数据啦~</span>
        </yd-infinitescroll>

        <yd-backtop></yd-backtop>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getOrderList } from '../api/api'
    export default {
        data () {
            return {
                orderData: [],
                cur_page:1,
                limit: 10
            }
        },
        created() {
            this.getUserOrderData()
        },

        methods: {
            getUserOrderData () {
                getOrderList({
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
                        this.orderData = [...this.orderData, ..._list]
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
