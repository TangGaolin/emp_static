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
                <span slot="left">本月消耗</span>
                <span slot="right">{{ empData.fee_sum }}</span>
            </yd-cell-item>
        </yd-cell-group>


    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getEmpDataView } from '../api/api'
    export default {
        data () {
            return {
                empData: {}
            }
        },
        computed: {
            ...mapGetters([
                'empInfo',
            ])
        },
        created() {
            this.getEmpData()
        },

        methods: {
            getEmpData () {
                getEmpDataView({
                    emp_id: this.empInfo.emp_id
                }).then((response) => {
                    if(0 !== response.statusCode) {
                        MessageBox('提示', response.msg);
                    }else{
                        this.empData = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }


    }
</script>
