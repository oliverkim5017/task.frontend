import request from './request';

export default {
    getProjects(data) {
        return request({
            url: '/getProjects',
            method: 'get',
            params: {
                projectName: data.projectName,
                startTime: data.startTime,
                endTime: data.endTime,
                createTime: data.createTime,
                updateTime: data.createTime,
            }
        })
    }

}
