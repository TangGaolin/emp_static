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
