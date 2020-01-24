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
        });        
    },
    add : (formData) => {
        return new Promise((resolve, reject) =>{
            axiosInstance().post(config.endpoint+'/user/add', formData)
            .then(response => {
                //console.log(response.data.errors[0].message);
                resolve(response.data);                
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
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
        
    },
    addComment : (formData) => {
        return new Promise((resolve, reject) =>{
            console.log('formData', formData);
            axiosInstance().post(config.endpoint+'/user/add-comment', formData)
            .then(response => {
                resolve(response.data);                
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },
}
export default userService;