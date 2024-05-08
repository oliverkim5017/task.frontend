
import request from "./request.js";

const taskService = {

    getTeams() {
        return request({
            url: '/getTeams',
            method: 'get'
        })
    },
    getStates(){
        return request({
            url: '/getStates',
            method: 'get'
        })
    },
    getTasks(data) {
        return request({
            url: '/getTasks',
            method: 'get',
            params: {
                projectId: data.projectId,
                startTime: data.startTime,
                endTime: data.endTime,
                userId: data.userId
            }
        })
    },
    addTask(data) {
        return request({
            url: '/addTask',
            method: 'post',
            data: data
        })
    },
    updateTask(data) {
        return request({
            url: '/updateTask',
            method: 'put',
            data: data
        })
    },
    delTask(id) {
        return request({
            url: '/delTask/' + id,
            method: 'delete'
        })
    },
    getMyTasks() {
        return request({
            url: '/getMyTasks',
            method: 'get'
        })
    }

}

export default taskService;
