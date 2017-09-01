import * as types from '../types'
import Cookies from 'js-cookie'

const state = {
    userInfo: Cookies.getJSON('cashierinfo'),
    globalConfig: {},
}
const mutations = {
    [types.SET_ACCOUNT] (state, account) {
        state.userInfo = account
        Cookies.set('cashierinfo', account)
    },
    [types.UNSET_ACCOUNT] (state) {
    	state.userInfo = null
        Cookies.remove('cashierinfo')
    }
}
export default {
    state: state,
    mutations: mutations
}
