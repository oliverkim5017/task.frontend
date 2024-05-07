import request from './request';

export default {
    getProjects(data) {
        return request({
            url: '/getProjects',
            method: 'get',
            params: {
                projectName: data?.projectName,
                startTime: data?.startTime,
                endTime: data?.endTime,
                createTime: data?.createTime,
                updateTime: data?.createTime,
            }
        })
    },
    delProject(id){
        return request({
            url: '/delProject/' + id,
            method: 'delete',
        })
    }

}
