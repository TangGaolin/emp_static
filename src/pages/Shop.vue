<style scoped>
</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="门店数据">
        </yd-navbar>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">今日业绩</span>
                <span slot="right">{{ shopDataView.yeji_today }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">今日消耗</span>
                <span slot="right">{{ shopDataView.xiaohao_today }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">本月业绩</span>
                <span slot="right">{{ shopDataView.yeji_sum }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">本月消耗</span>
                <span slot="right">{{ shopDataView.xiaohao_sum }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title = "预约记录">
            <yd-timeline class="demo-small-pitch">
                <yd-timeline-item v-for="(item, index) in orderTimeData" :key="index">
                    <p>{{ item.user_name }} : {{ item.remark }}</p>
                    <p style="margin-top: 10px;">{{ item.emp_name }} &nbsp; {{item.order_time}}</p>
                </yd-timeline-item>
            </yd-timeline>
        </yd-cell-group>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getOrderTime, getShopDataView} from '../api/api'
    import {formatDate} from '../utils/utils'
    export default {
        data () {
            return {
                orderTimeData: [],
                viewData:[],
                shopDataView: {
                    yeji_today: 0,
                    xiaohao_today: 0,
                    yeji_sum: 0,
                    xiaohao_sum: 0,
                }
            }
        },
        computed: {
            ...mapGetters([
                'empInfo',
            ])
        },
        created() {
            this.getShopData()
            this.getOrderTimeData()
        },

        methods: {
            getOrderTimeData() {
                let date = new Date()
                date.setDate(date.getDate() - 1)
                getOrderTime({
                    start_time: formatDate(date, 'yyyy-MM-dd HH:mm'),
                    shop_id: this.empInfo.shop_id
                }).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    } else {
                        this.orderTimeData = response.data
                        if(this.orderTimeData.length > 0) {
                            this.orderTimeData.sort(function(a, b) {
                                return a.order_time > b.order_time;
                            })
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            getShopData() {
                getShopDataView({shop_id: this.empInfo.shop_id}).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    } else {
                        this.viewData = response.data
                        this.countData()
                    }
                })
            },

            countData() {
                this.shopDataView = {
                    yeji_today: 0,
                    xiaohao_today: 0,
                    yeji_sum: 0,
                    xiaohao_sum: 0
                }
                let currentDay = formatDate(new Date(), "dd")
                this.viewData.forEach((item) => {
                    this.shopDataView.yeji_sum += Number(item.yeji)
                    this.shopDataView.xiaohao_sum += Number(item.xiaohao)
                    if(currentDay == item.day) {
                        this.shopDataView.yeji_today = item.yeji
                        this.shopDataView.xiaohao_today = item.xiaohao
                    }
                })
            }
        }


    }
</script>
