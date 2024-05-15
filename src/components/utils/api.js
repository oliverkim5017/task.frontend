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
    },
    getOperationLog() {
        return request({
            url: '/getOperationLog',
            method: 'get',
        })
    },
    startApproval(data) {
        return request({
            url: '/startApproval',
            method: "post",
            data: {
                id: data.id,
                taskId: data.taskId,
                remarks: data.remarks,
                forFinish: data.forFinish
            }
        })
    },
    getApproval(data) {
        return request({
            url: '/getApproval',
            method: 'get',
            params: {
                taskId: data.id,
                userId: data.userId
            }
        })
    },
    getToApprove() {
        return request({
            url: '/getToApprove',
            method: 'get'
        })
    },
    getTaskById(id) {
        return request({
            url: '/getTaskById/' + id,
            method: 'get'
        })
    },
    approveReply(data) {
        return request({
            url: '/approveReply',
            method: 'post',
            data: data
        })
    },
    getProjectSummary(data) {
        return request({
            url: '/getProjectSummary',
            method: 'get',
            params: {
                year: data.year,
                month: data.month
            }
        })
    },
    getTaskSummary(data) {
        return request({
            url: '/getTaskSummary',
            method: 'get',
            params: {
                year: data.year,
                month: data.month
            }
        })
    },
    getProjectOfDepartmentSummary(data) {
        return request({
            url: '/getProjectOfDepartmentSummary',
            method: 'get',
            params: {
                year: data.year,
                month: data.month
            }
        })
    },
    getApproveDetails() {
        return request({
            url: '/getApproveDetails',
            method: 'get',
        })
    }
}
