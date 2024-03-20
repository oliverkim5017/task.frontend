import axios from "axios";
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: "http://localhost:8080",
});

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
);

request.interceptors.response.use(
    response => {
        if (response.data.code === 200) {
            if (response.config.method !== 'get'){
                ElMessage({
                    showClose: true,
                    message: response.data.msg,
                    type: "success"
                });
            }
        } else {
            ElMessage({
                showClose: true,
                message: response.data.msg,
                type: "error"
            });
        }
        return response;
    },
    error => {
        if (error.response && error.response.data) {
            ElMessage({
                showClose: true,
                message: error.response.data.msg,
                type: "error"
            });
        }
        return Promise.reject(error);
    }
);
export default request;