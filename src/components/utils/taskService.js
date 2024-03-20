
import request from "./request.js";

export default {

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
                teamIds: data.teamIds,
                stateIds: data.stateIds
            }
        })
    }

}