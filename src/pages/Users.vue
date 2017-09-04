<style>
    .yd-backtop {
        bottom: 10%;
    }
</style>

<template>
    <div>
        <yd-navbar slot="navbar" title="会员列表">
        </yd-navbar>
        <yd-infinitescroll :callback="getUserList" ref="lsdemo">
            <yd-list theme="4" slot="list">
                <yd-cell-item>
                    <i slot="icon" class="demo-icons-phone"></i>
                    <input slot="right" type="text" v-model="user_name_phone" placeholder="姓名/手机" autocomplete="off">
                    <yd-button slot="right" type="primary" @click.native="getUserList(1)">搜索</yd-button>
                </yd-cell-item>
                <yd-cell-item v-for="item in userList" arrow type="link" href="user-info" :key = "item.uid">
                    <span slot="left"> {{ item.user_name }} </span>
                    <span slot="right">{{ item.phone_no }}</span>
                </yd-cell-item>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有更多数据啦~</span>
        </yd-infinitescroll>
        <yd-backtop style="bottom: 10%"></yd-backtop>
    </div>
</template>



<script type="text/babel">
    import { mapGetters } from 'vuex'
    import { getUsers } from '../api/api'
    export default {
        data() {
            return {
                userList: [],
                user_name_phone: "",
                cur_page:1,
                limit: 15
            }
        },
        computed: {
            ...mapGetters([
                'empInfo',
            ])
        },
        created() {
            this.getUserList()
        },
        methods: {
            getUserList(is_search = 0) {
                if (is_search) {
                    this.cur_page = 0
                    this.userList = []
                }
                getUsers({
                    emp_id: this.empInfo.emp_id,
                    user_name_phone: this.user_name_phone,
                    limit: this.limit,
                    cur_page: this.cur_page
                }).then((response) => {
                    if (0 !== response.statusCode) {
                        this.$dialog.notify({
                            mes: response.msg,
                            timeout: 5000
                        });
                    } else {
                        const _list = response.data.data
                        this.userList = [...this.userList, ..._list]
                        if (_list.length < this.limit || Math.ceil(response.data.totalSize / this.limit) <= this.page) {
                            // 所有数据加载完毕
                            this.$refs.lsdemo.$emit('ydui.infinitescroll.loadedDone')
                            return
                        }

                        // 单次请求数据完毕
                        this.$refs.lsdemo.$emit('ydui.infinitescroll.finishLoad')
                        this.cur_page++
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }

    };
</script>