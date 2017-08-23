<style>
</style>

<template>
    <div class="to-button">
        <!--<mt-search autofocus v-model="searchValue" :result="filterResult" @on-change="searchUsers"></mt-search>-->
        <mt-button @click.native="openPrompt" size="large" showCancelButton="true">搜索</mt-button>
        <mt-cell v-for="name in names" :title="name" label="Tel: 13247719350" :key="name" isLink></mt-cell>
    </div>
</template>



<script type="text/babel">
    import { MessageBox } from 'mint-ui'

    export default {
        data() {
            return {
                searchValue:"",
                names: ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'],
                filterResult:[]
            }
        },

        methods:{
            searchUsers() {
                console.log("xxx")
                return this.names.filter(value => new RegExp(this.searchValue, 'i').test(value));
            },
            openPrompt() {
                MessageBox.prompt(' ', '会员姓名/手机号').then(({ value }) => {
                    if (value) {
                        MessageBox.alert(`你的名字是 ${ value }`, '输入成功');
                    }
                });
            }
        }
    };
</script>