<style>
</style>

<template>
    <yd-layout>
        <yd-navbar slot="navbar" :title="$route.query.order_desc">
            <router-link to="/order/order-list" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <br/>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">时间</span>
                <span slot="right">{{ orderInfo.add_time }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">收银员</span>
                <span slot="right">{{ orderInfo.cashier_name }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <div  v-if="0 == $route.query.from_type">
            <OrderInfo :orderInfo = orderInfo></OrderInfo>
        </div>

        <div  v-if="1 == $route.query.from_type">
            <UseOrderInfo :orderInfo = orderInfo></UseOrderInfo>
        </div>

        <div v-if="orderInfo.remark && orderInfo.remark .length > 0">
            <yd-cell-group  title="服务记录">
                <yd-timeline class="demo-small-pitch">
                    <yd-timeline-item v-for="(item, index) in orderInfo.remark" :key="index">
                        <p>{{item.remark}}</p>
                        <p style="margin-top: 10px;">{{ item.emp_name }} &nbsp; {{item.add_time}}</p>
                    </yd-timeline-item>
                </yd-timeline>
            </yd-cell-group>
        </div>

        <yd-cell-group title="添加记录">
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="输入服务过程需要记录的事项" v-model = "new_remark" maxlength="255"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <p style="padding: 2px">
            <yd-button size="large" type="hollow" @click.native="addServerLog">提 交</yd-button>
        </p>


    </yd-layout>
</template>



<script type="text/babel">
    import { mapGetters } from 'vuex'
    import { getOrderInfo,serverLog } from '../api/api'
    export default {
        data() {
            return {
                orderInfo: {},
                new_remark: ""
            }
        },

        created() {
            this.getOrderDetail()
        },
        methods: {
            getOrderDetail() {
                getOrderInfo({
                    from_type: this.$route.query.from_type,
                    order_id: this.$route.query.order_id
                }).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    } else {
                        this.orderInfo = response.data
                        this.orderInfo.remark = this.orderInfo.remark.reverse()
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            addServerLog() {
                if(!this.new_remark){
                    this.$dialog.notify({
                        mes: "提交记录为空！",
                        timeout: 2000
                    })
                    return
                }
                serverLog({
                    remark: this.new_remark,
                    order_id: this.$route.query.order_id,
                    from_type: this.$route.query.from_type,
                }).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    } else {
                        this.getOrderDetail()
                        this.new_remark = ""
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    };
</script>