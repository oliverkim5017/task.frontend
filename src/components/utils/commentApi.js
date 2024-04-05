
import request from "./request.js";

const commentApi = {
    getComments(taskId) {
        return request({
            url: '/getComments/' + taskId,
            method: 'get'
        })
    },
    addComment(data) {
        return request({
            url: '/addComment',
            method: 'post',
            data
        })
    }


}

export default  commentApi;