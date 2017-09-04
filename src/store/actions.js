import * as types from './types'
import { login,logout } from '../api/api'
import { Notify } from 'vue-ydui/dist/lib.rem/dialog'

export const loginAction = ({commit}, params) => {
    return new Promise((resolve, reject)=> {
        login(params).then((response) => {
            if(0 !== response.statusCode) {
                Notify({
                    mes: response.msg,
                    timeout: 2000
                });
            }else{
                commit(types.SET_ACCOUNT, response.data); //获得的数据通过mutation，存入store中
                resolve(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}



export const logoutAction = ({commit}, params) => {
    return new Promise((resolve, reject)=> {
        logout(params).then((response) => {
            if(0 !== response.statusCode) {
                Notify({
                    mes: response.msg,
                    timeout: 2000
                });
            }else{
                commit(types.UNSET_ACCOUNT); //获得的数据通过mutation，存入store中
                resolve(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}

