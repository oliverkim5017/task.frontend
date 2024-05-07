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
                name: queryParams?.name
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
    getStatus(data) {
        return request({
            url: '/getStatus',
            method: 'get',
            params: {
                name: data?.name,
                forTask: false
            }
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
    },
    saveProject(data) {
        return request({
            url: '/saveProject',
            method: 'post',
            data: data,
        })
    },
    getUsers() {
        return request({
            url: '/getUsers',
            method: 'get'
        })
    },
    getUser(data) {
        return request({
            url: '/getUser',
            method: 'get',
            params: {
                username: data?.username,
                name: data?.name
            }
        })
    },
    saveUser(user) {
        return request({
            url: '/saveUser',
            method: 'post',
            data: user
        })
    },
    delDept(id) {
        return request({
            url: '/delDept/' + id,
            method: 'delete'
        })
    },
    getStates(data) {
        return request({
            url: '/getStatus',
            method: 'get',
            params: {
                name: data?.name,
                forTask: true,
            }
        })
    },
    saveTask(data) {
        return request({
            url: '/saveTask',
            method: 'post',
            data: data
        })
    }
}
