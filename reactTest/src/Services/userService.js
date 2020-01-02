import config, {axiosInstance} from '../config/config'


const userService = {
    list : (userId = null) => {
        return new Promise((resolve, reject) => {
            axiosInstance().get(config.endpoint + '/user/list/'+(userId !== null? userId : ''))
            .then(response => {
                resolve(response.data);				
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        })
        
    },
    add : () => {

    },
    edit : () => {

    },
    delete : (userId) => {
        return new Promise((resolve, reject) =>{
            axiosInstance().post(config.endpoint+'/user/delete', {id:userId})
            .then(response=>{
                console.log(response.data);
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
        
    }
}
export default userService;