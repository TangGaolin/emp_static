import { fetch } from '../utils/fetch'

export function getConfig(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/getConfig',
        method: 'post',
        data
    });
}

export function login(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/login',
        method: 'post',
        data
    });
}

export function logout(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/logout',
        method: 'post',
        data
    });
}


export function getEmpDataView(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getEmpDataView',
        method: 'post',
        data
    });
}

export function getUsers(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getUsers',
        method: 'post',
        data
    });
}

export function getEmpOrderList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getEmpOrderList',
        method: 'post',
        data
    });
}

export function resetPassword(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/resetPassword',
        method: 'post',
        data
    });
}

export function getOrderInfo(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getOrderInfo',
        method: 'post',
        data
    });
}

export function serverLog(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/serverLog',
        method: 'post',
        data
    });
}

export function getUserDetail(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getUserDetail',
        method: 'post',
        data
    });
}

export function orderTime(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/orderTime',
        method: 'post',
        data
    });
}

export function getOrderTime(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getOrderTime',
        method: 'post',
        data
    });
}

export function getUserItemList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getUserItemList',
        method: 'post',
        data
    });
}



export function getOrderList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getOrderList',
        method: 'post',
        data
    });
}


export function getUseOrderList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/emp/getUseOrderList',
        method: 'post',
        data
    });
}
