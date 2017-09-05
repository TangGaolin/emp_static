<style>
</style>

<template>
    <div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">单据号</span>
                <span slot="right">{{ orderInfo.use_order_id }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <!--购买项目单据-->
        <div v-if="orderInfo.uid !== 0" >
            <yd-cell-group v-for="item in orderInfo.items_info" :key="item.item_id">
                <yd-cell-item>
                    <span slot="left">项目名称</span>
                    <span slot="right">{{ item.item_name }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">消耗次数</span>
                    <span slot="right">{{ item.use_time }}</span>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">消耗单价</span>
                    <span slot="right">{{ item.sold_price }}</span>
                </yd-cell-item>

                <yd-cell-item v-for="emp in item.emps" :key="emp.emp_id">
                    <span slot="left"> {{ emp.emp_name }}</span>
                    <span slot="right"> 手工:{{ emp.fee }} 消耗: {{ emp.xiaohao }} </span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <!--购买项目单据-->
        <div v-if="orderInfo.uid === 0">
            <yd-cell-group  v-for="item in orderInfo.items_info.use_items" :key="item.item_id">
                <yd-cell-item>
                    <span slot="left">项目名称</span>
                    <span slot="right">{{ item.item_name }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">消耗次数</span>
                    <span slot="right">{{ item.use_time }}</span>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">消耗单价</span>
                    <span slot="right">{{ item.sold_price }}</span>
                </yd-cell-item>

                <yd-cell-item v-for="emp in item.emps" :key="emp.emp_id">
                    <span slot="left"> {{ emp.emp_name }}</span>
                    <span slot="right"> 手工:{{ emp.fee }} 消耗: {{ emp.xiaohao }} </span>
                </yd-cell-item>
            </yd-cell-group>
        </div>


        <yd-cell-group v-if="orderInfo.uid === 0">
            <yd-cell-item v-for="emp in rows.items_info.server_emps" :key="emp.emp_id">
                <span slot="left">{{ emp.emp_name }} </span>
                <span slot="right"> 手工:{{ emp.fee }} 消耗: {{ emp.xiaohao }} </span>
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