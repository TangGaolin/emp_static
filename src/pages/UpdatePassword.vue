<style scoped>

</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="重置密码">
            <router-link to="/mine/mine-info" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <br/>
        <br/>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">当前密码：</span>
                <yd-input slot="right" required type="password" v-model="resetData.current_password"  placeholder="请输入密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">新 密 码：</span>
                <yd-input slot="right" required type="password" v-model="resetData.new_password"   placeholder="请输入密码"></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">确认密码：</span>
                <yd-input slot="right" required type="password" v-model="resetData.check_new_password" placeholder="请输入密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <p style="padding: 10px">
            <yd-button size="large" type="hollow" @click.native="updatePassword">确认修改</yd-button>
        </p>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { resetPassword } from '../api/api'
    export default {
        data() {
            return {
                resetData: {
                    current_password: "",
                    new_password: "",
                    check_new_password: ""
                }
            }
        },
        created() {
        },
        methods: {
            updatePassword() {
                //数据验证
                if(!this.resetData.current_password){
                    this.$dialog.notify({
                        mes: "当前密码不能为空!",
                        timeout: 2000
                    })
                    return
                }

                if(!this.resetData.new_password){
                    this.$dialog.notify({
                        mes: "新密码不能为空!",
                        timeout: 2000
                    })
                    return
                }
                if(!this.resetData.check_new_password){
                    this.$dialog.notify({
                        mes: "确认密码不能为空!",
                        timeout: 2000
                    })
                    return
                }
                if(this.resetData.check_new_password !== this.resetData.new_password){
                    this.$dialog.notify({
                        mes: "两次密码输入不正确!",
                        timeout: 2000
                    })
                    return
                }
                resetPassword(this.resetData).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 2000
                        })
                    }else{
                        this.$dialog.notify({
                            mes: "修改成功，重新登录!",
                            timeout: 2000
                        })
                        this.$store.dispatch('logoutAction',{}).then(() => {
                            // 退出成功
                            this.$router.push('/login')
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            test(){
                console.log("xxx")
                window.history.go(-1)
            }
        }
    }

</script>
