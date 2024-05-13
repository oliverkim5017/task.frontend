
import request from './request';

export default {
    login(data) {
        return request({
            url: '/login',
            method: 'post',
            data
        });
    },
    register(data) {
        return request({
            url: '/register',
            method: 'post',
            data
        });
    },
    getTeams() {
        return request({
            url: '/getTeams',
            method: 'get'
        });
    },

    getMyInfo() {
        return request({
            url: '/myInfo',
            method: 'get'
        });
    },
    changePassword(data) {
        return request({
            url: '/changePassword',
            method: 'post',
            data: data
        })
    }
};
