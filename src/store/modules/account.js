import * as types from '../types'
import Cookies from 'js-cookie'

const state = {
    empInfo: Cookies.getJSON('empinfo'),
    globalConfig: {},
}
const mutations = {
    [types.SET_ACCOUNT] (state, account) {
        state.userInfo = account
        Cookies.set('empinfo', account)
    },
    [types.UNSET_ACCOUNT] (state) {
    	state.userInfo = null
        Cookies.remove('empinfo')
    }
}
export default {
    state: state,
    mutations: mutations
}
