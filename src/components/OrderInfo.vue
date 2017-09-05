<style>
</style>

<template>
    <div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">单据号</span>
                <span slot="right">{{ orderInfo.order_id }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <!--充值-->
        <div v-if="orderInfo.order_type == 0">
            <!--产品充值-->
            <yd-cell-group >
                <yd-cell-item>
                    <span slot="left">充值金额</span>
                    <span slot="right">{{ orderInfo.worth_money }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <div v-if="orderInfo.order_type == 1">
            <yd-cell-group  v-for="item in orderInfo.order_info" :key="item.item_id">
                <yd-cell-item>
                    <span slot="left">项目名称</span>
                    <span slot="right">{{ item.item_name }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">项目次数</span>
                    <span slot="right">{{ item.times }}</span>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">销售金额</span>
                    <span slot="right">{{ item.sold_money }}</span>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">销售折扣</span>
                    <span slot="right">{{ item.discount }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <div v-if="orderInfo.order_type == 2">
            <!--购买产品-->
            <yd-cell-group  v-for="item in orderInfo.order_info" :key="item.item_id">
                <yd-cell-item>
                    <span slot="left">产品名称</span>
                    <span slot="right">{{ item.good_name }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">产品数量</span>
                    <span slot="right">{{ item.num + " " + item.unit}}</span>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">金额</span>
                    <span slot="right">{{ item.sold_money }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">销售折扣</span>
                    <span slot="right">{{ item.discount }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>


        <div v-if="orderInfo.order_type == 3">
            <!--购买产品-->
            <yd-cell-group >
                <yd-cell-item>
                    <span slot="left">还款金额</span>
                    <span slot="right">{{ orderInfo.pay_money }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <div  v-if="orderInfo.order_type == 4">
            <!--产品卡信息-->
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">产品卡充值金额</span>
                    <span slot="right">{{ orderInfo.order_info }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">产品充值金额</span>
                    <span slot="right">{{ orderInfo.worth_money }}</span>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">充值折扣</span>
                    <span slot="right">{{ (orderInfo.worth_money / row.order_info * 10).toFixed(2) }}</span>
                </yd-cell-item>
            </yd-cell-group>

        </div>

        <div  v-if="orderInfo.order_type == 5 || orderInfo.order_type == 6">

            <!--退换-->
            <yd-cell-group
                           v-for="item in orderInfo.order_info.select_items" :key="item.item_id"
            >
                <yd-cell-item>
                    <span slot="left">退项目名称</span>
                    <span slot="right">{{ item.item_name }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">退项目次数</span>
                    <span slot="right">{{ item.change_times }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">项目金额</span>
                    <span slot="right">{{ item.change_money }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">手续费</span>
                    <span slot="right">{{ orderInfo.order_info.change_fee }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <div v-if="orderInfo.order_type == 6">
            <yd-cell-group
                    v-for="item in orderInfo.order_info.select_new_items" :key="item.item_id"
            >
                <yd-cell-item>
                    <span slot="left">换购项目名称</span>
                    <span slot="right">{{ item.item_name }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">换购项目次数</span>
                    <span slot="right">{{ item.times }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">销售金额</span>
                    <span slot="right">{{ item.sold_money }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">销售折扣</span>
                    <span slot="right">{{ item.discount }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <!--是否使用余额-->
        <div v-if="orderInfo.pay_balance > 0">
            <yd-cell-group >
                <yd-cell-item>
                    <span slot="left">卡扣金额</span>
                    <span slot="right">{{ orderInfo.pay_balance }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <!--是有使用欠款-->
        <div v-if="orderInfo.debt > 0">
            <yd-cell-group >
                <yd-cell-item>
                    <span slot="left">欠款金额</span>
                    <span slot="right">{{ orderInfo.debt }}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <!--业绩分配-->
        <yd-cell-group title="业绩分配">
            <yd-cell-item v-for="emp in orderInfo.emp_info" :key="emp.emp_id">
                <span slot="left">{{ emp.emp_name }}</span>
                <span slot="right">{{ emp.money }}</span>
            </yd-cell-item>
        </yd-cell-group>

    </div>
</template>



<script type="text/babel">
    import { mapGetters } from 'vuex'
    import { getUsers } from '../api/api'
    export default {
        props: {
            orderInfo: Object
        },
        data() {
            return {

            }
        },

        created() {
        },
        methods: {

        }

    };
</script>