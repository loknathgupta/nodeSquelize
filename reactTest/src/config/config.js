import Axios from 'axios';
import loginService from '../Services/loginService';
let config = {
    endpoint: 'http://localhost:4001'
}

const axiosInstance = () => {
    let instance = Axios.create({
        baseURL: config.endpoint,
        /* other custom settings */
    });
    instance.interceptors.request.use(function (config) {
        config.headers.Authtoken = 'Bearer ' + localStorage.getItem('token');
        return config;
    });



    instance.interceptors.response.use(
        response => {
            return response;
        }, 
        error => {
            console.log(error.response);
            if (error.response && error.response.status === 401) {
                loginService.logout()
            }
            return error;
        }
    );

    return instance;
}


export {
    config as default,
    axiosInstance
}