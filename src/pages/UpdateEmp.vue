<style scoped>

</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="选择美容师">
            <router-link :to="'user-info?uid='+$route.query.uid" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <br/>
        <br/>
        <yd-cell-group title="单选">
            <yd-cell-item type="radio" v-for="emp in empList" :key="emp.emp_id">
                <span slot="left">{{ emp.emp_name }} ({{emp.user_num}})</span>
                <input slot="right" type="radio" :value="emp.emp_id" v-model="selectEmp"/>
            </yd-cell-item>
        </yd-cell-group>

        <p style="padding: 10px">
            <yd-button size="large" type="hollow" @click.native="updateUserEmp">确认</yd-button>
        </p>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { updateUser} from '../api/api'
    export default {
        data() {
            return {
                selectEmp: "",
            }
        },

        computed: {
            ...mapGetters([
                'empInfo',
                'empList'
            ])
        },

        created() {
            this.selectEmp = this.$route.query.emp_id
            if(0 === this.empList.length){
                let queryParam = {
                    shop_id: this.empInfo.shop_id,
                    is_server: 1,
                    limit:1000
                }
                this.$store.dispatch('getEmpListAction', queryParam)
            }
        },
        methods: {
            updateUserEmp() {
                updateUser({
                    uid: this.$route.query.uid,
                    emp_id: this.selectEmp
                }).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    }else{
                        this.$dialog.notify({
                            mes: "修改成功!",
                            timeout: 2000
                        })
                        history.go(-1)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }

</script>
