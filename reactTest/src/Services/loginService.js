import config, {axiosInstance} from '../config/config'


const loginService = {
    login :(email, password) => {
        return new Promise((resolve, reject) => {
            axiosInstance().post(config.endpoint+'/user/login', {email, password})
            .then(response => {
                console.log('response', response);
                if( response.data.status === 'success'){
                    localStorage.setItem('token', response.data.token);
                }
                resolve(response.data);
            });
        });
       
    },
    logout : () => {
        localStorage.removeItem('token');
        //window.location.replace('/login');
        //this.props.history.push('/list');
    }
}
export default loginService;