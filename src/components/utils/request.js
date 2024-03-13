import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8001",
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

export default request;