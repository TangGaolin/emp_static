import * as types from '../types'

const state = {
    emplist: [],
}
const mutations = {
    [types.SET_EMPS] (state, emplist) {
        state.emplist = emplist.data
    },
}

export default {
    state: state,
    mutations: mutations
}
