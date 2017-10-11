const getters = {
    empInfo: state => state.account.empInfo, //登录账号信息
    empList: state => state.emps.emplist, //员工信息
}

export default getters
