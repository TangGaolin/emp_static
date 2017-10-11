import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import emps from './modules/emps'
import * as actions from './actions'
import getters from './getters'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
        emps,
    },
    actions,
    getters
})


