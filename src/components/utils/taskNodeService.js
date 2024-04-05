import request from "./request.js";

const taskNodeService = {
    delTaskNode(id) {
        return request({
            url: '/delTaskNode/' + id,
            method: 'delete',
        })
    },
    addTaskNode(data) {
        return request({
            url: '/addNode',
            method: 'post',
            data: data
        })
    },
    updateTaskNode(data) {
        return request({
            url: '/updateNode',
            method: 'put',
            data: data
        })
    }

}


export default taskNodeService;