<style>
    .yd-backtop {
        bottom: 10%;
    }
</style>

<template>
    <div>
        <yd-navbar slot="navbar" :title="userInfo.user_name">
            <router-link to="/user" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <br/>
        <yd-cell-group title = "用户信息">

            <yd-cell-item arrow type="a" :href="'tel:'+userInfo.phone_no">
                <span slot="left">手机</span>
                <span slot="right">{{ userInfo.phone_no }}</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">生日</span>
                <span slot="right">{{ userInfo.birthday }}</span>
            </yd-cell-item>

            <yd-cell-item arrow type="link" :href="'user-emp?uid='+$route.query.uid+'&emp_id='+userInfo.emp_id">
                <span slot="left">美容师</span>
                <span slot="right">{{ userInfo.emp_name }}</span>
            </yd-cell-item>


        </yd-cell-group>

        <yd-cell-group title = "账户信息">
            <yd-cell-item>
                <span slot="left">余额</span>
                <span slot="right">{{ userInfo.balance }}</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">产品余额</span>
                <span slot="right">{{ userInfo.good_money }}</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">积分</span>
                <span slot="right">{{ userInfo.point }}</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">欠款</span>
                <span slot="right">{{ userInfo.debt }}</span>
            </yd-cell-item>

            <yd-cell-item arrow type="link" :href="'user-item?uid='+$route.query.uid">
                <span slot="left">拥有卡项</span>
                <span slot="right">查看</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title = "用户记录">
            <yd-cell-item arrow type="link" :href="'user-order?uid='+$route.query.uid">
                <span slot="left">购买记录</span>
                <span slot="right">查看</span>
            </yd-cell-item>

            <yd-cell-item arrow type="link" :href="'user-useorder?uid='+$route.query.uid">
                <span slot="left">耗卡记录</span>
                <span slot="right">查看</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title = "预约时间">
            <yd-cell-item arrow>
                <span slot="left">选择时间：</span>
                <yd-datetime slot="right"
                             :yearFormat="yearFormat"
                             :monthFormat="monthFormat"
                             :dayFormat="dayFormat"
                             :hourFormat="hourFormat"
                             :minuteFormat="minuteFormat"
                             type="datetime" v-model="orderTime"></yd-datetime>

            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">备注：</span>
                <input slot="right" type="text" v-model="remark" placeholder="选填">
            </yd-cell-item>
        </yd-cell-group>

        <yd-button-group>
            <yd-button size="large" @click.native="submitOrderTime">提交预约</yd-button>
        </yd-button-group>

        <br/>
        <yd-cell-group title = "预约记录">
            <yd-timeline class="demo-small-pitch">
                <yd-timeline-item v-for="(item, index) in orderTimeData" :key="index">
                    <p>{{ item.remark }}</p>
                    <p style="margin-top: 10px;">{{ item.emp_name }} &nbsp; {{item.order_time}}</p>
                </yd-timeline-item>
            </yd-timeline>
        </yd-cell-group>

    </div>
</template>



<script type="text/babel">
    import { mapGetters } from 'vuex'
    import { formatDate } from '../utils/utils'
    import { getUserDetail, orderTime, getOrderTime } from '../api/api'
    export default {
        data() {
            return {
                userInfo:{},
                orderTime: "",
                remark: "",
                orderTimeData: [],
                yearFormat: '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
                monthFormat: '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
                dayFormat: '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',
                hourFormat: '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">时</i></span>',
                minuteFormat: '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">分</i></span>'
            }
        },

        computed: {
            ...mapGetters([
                'empInfo',
            ])
        },

        created() {
            this.orderTime = formatDate(new Date(), 'yyyy-MM-dd HH:mm')
            this.getUserInfo()
            this.getOrderTimeData()
        },
        methods: {
            getUserInfo() {
                getUserDetail(this.$route.query).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    } else {
                        this.userInfo = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            submitOrderTime() {
                if(this.orderTime < formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')) {
                    this.$dialog.notify({
                        mes: "请选择正确的预约时间!",
                        timeout: 2000
                    })
                    return
                }
                orderTime({
                    uid:this.userInfo.uid,
                    shop_id: this.empInfo.shop_id,
                    remark: this.remark,
                    order_time: this.orderTime
                }).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    } else {
                        this.remark = ""
                        this.$dialog.alert({
                            mes: "预约成功!"
                        })
                        this.getOrderTimeData()
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            getOrderTimeData() {
                var date = new Date()
                date.setDate(date.getDate() - 1)
                getOrderTime({
                    uid:this.$route.query.uid,
                    start_time: formatDate(date, 'yyyy-MM-dd HH:mm'),
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
            }
        }

    };
</script>