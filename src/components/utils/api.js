import request from "./request.js";

export default {
    getDepartments() {
        return request({
            url: '/getDepartments',
            method: 'get',
        })
    },
    saveOrUpdateDept (data) {
        return request({
            url: '/saveOrUpdateDept',
            method: 'post',
            data: data
        })
    },
    getRoles(queryParams) {
        return request({
            url: '/getRoles',
            method: 'get',
            params: {
                name: queryParams.name
            }
        })
    },
    saveRole(role) {
        return request({
            url: '/saveRole',
            method: 'post',
            data: role
        })
    },
    delRole(id) {
        return request({
            url: '/delRole/' + id,
            method: 'delete',
        })
    },
    getStatus() {
        return request({
            url: '/getStatus',
            method: 'get',
        })
    },
    saveStatus(sta) {
        return request({
            url: '/saveStatus',
            method: 'post',
            data: sta
        })
    },
    delStatus(id) {
        return request({
            url: '/delStatus/' + id,
            method: 'delete'
        })
    }
}
