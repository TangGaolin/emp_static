<style scoped>
</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="我">
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">姓名</span>
                <span slot="right">{{ empInfo.emp_name }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">岗位</span>
                <span slot="right">{{ empInfo.job }}</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">所在门店</span>
                <span slot="right">{{ empInfo.shop_name }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">今日业绩</span>
                <span slot="right">{{ empData.yeji_today }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">今日消耗</span>
                <span slot="right">{{ empData.xiaohao_today }}</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">今日手工</span>
                <span slot="right">{{ empData.fee_today }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">本月业绩</span>
                <span slot="right">{{ empData.yeji_sum }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">本月消耗</span>
                <span slot="right">{{ empData.xiaohao_sum }}</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">本月手工</span>
                <span slot="right">{{ empData.fee_sum }}</span>
            </yd-cell-item>
        </yd-cell-group>


        <yd-cell-group title = "我的预约">
            <yd-timeline class="demo-small-pitch">
                <yd-timeline-item v-for="(item, index) in orderTimeData" :key="index">
                    <p>{{ item.user_name }} : {{ item.remark }}</p>
                    <p style="margin-top: 10px;">{{item.order_time}}</p>
                </yd-timeline-item>
            </yd-timeline>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item arrow type="link" href="update-password">
                <span slot="left">修改密码</span>
                <span slot="right">前往</span>
            </yd-cell-item>
        </yd-cell-group>

        <p style="padding: 10px">
            <yd-button size="large" type="danger" @click.native="logout">退出</yd-button>
        </p>


    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getEmpDataView, getOrderTime } from '../api/api'
    import { formatDate } from '../utils/utils'
    export default {
        data () {
            return {
                empData: {},
                orderTimeData: []
            }
        },
        computed: {
            ...mapGetters([
                'empInfo',
            ])
        },
        created() {
            this.getEmpData()
            this.getOrderTimeData()
        },

        methods: {
            getEmpData () {
                getEmpDataView({
                    emp_id: this.empInfo.emp_id
                }).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    }else{
                        this.empData = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            getOrderTimeData() {
                getOrderTime({
                    emp_id: this.empInfo.emp_id,
                    start_time: formatDate(new Date(), 'yyyy-MM-dd'),
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
            logout() {
                this.$store.dispatch('logoutAction',{}).then(() => {
                    // 退出成功
                    this.$router.push('/login')
                })
            }

        }


    }
</script>
