<style scoped>
    .account-info {
        margin-top: 1.5rem;
        background-color: #fff;
    }
</style>

<template>
    <div class="to-button">

        <div class = "account-info">
            <mt-cell title="姓名" value="石海云"></mt-cell>
            <mt-cell title="岗位" value="高级美容师"></mt-cell>
            <mt-cell title="所在门店" value="春意浓店"></mt-cell>
        </div>

        <div class = "account-info">
            <mt-cell title="今日业绩" value="说明文字" is-link></mt-cell>
            <mt-cell title="今日消耗" value="说明文字" is-link></mt-cell>
            <mt-cell title="今日手工" value="说明文字" is-link></mt-cell>
        </div>

        <div class = "account-info">
            <mt-cell title="本月业绩" value="说明文字" is-link></mt-cell>
            <mt-cell title="本月消耗" value="说明文字" is-link></mt-cell>
            <mt-cell title="本月手工" value="说明文字" is-link></mt-cell>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            accountInfo: {
                emp_name: "",
            }
        }
    }
}
</script>
