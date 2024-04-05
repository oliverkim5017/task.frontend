
import request from "./request.js";

const commentApi = {
    getComments(taskId) {
        return request({
            url: '/getComments/' + taskId,
            method: 'get'
        })
    },
    addComment(data, taskId) {
        return request({
            url: '/addComment/' + taskId,
            method: 'post',
            data
        })
    },
    getMyComments() {
        return request({
            url: '/getMyComments',
            method: 'get'
        })
    }


}

export default  commentApi;