<style scoped>

</style>

<template>
    <yd-layout>
        <div style="margin-top: 30%;">
            <div class="page-title">
                德美店务员工端
            </div>
            <p style="font-size: 12px;text-align: center">让每一个家庭拥有健康、快乐、美丽！</p>
            <br/>
            <br/>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">账 号：</span>
                    <yd-input slot="right" required type="tel" v-model="userInfo.user"  placeholder="请输入登录账号"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">密 码：</span>
                    <yd-input slot="right" required type="password" v-model="userInfo.password" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
            </yd-cell-group>

            <p style="padding: 10px">
                <yd-button size="large" type="hollow" @click.native="login">登 录</yd-button>
            </p>
        </div>
    </yd-layout>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    user : "",
                    password : "",
                }
            }
        },
        created() {
        },
        methods: {
            login() {

                this.$store.dispatch('loginAction', this.userInfo).then((response) => {
                    this.$router.push('/')
                })
            }
        }
    }

</script>
