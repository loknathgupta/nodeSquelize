const userModel = require('../../models/mongo/userModel');

let addUser = userData => {
    // console.log('userData', userData);
    return new Promise((resolve, reject) => {
        let user;
        userModel.findOne().where('id').equals(userData.id)
        .then(user => {
            if(user){ //USER EXISTS THEN UPDATE VALUES
                console.log('Mongo User TO UPDATE.')
                for(key in userData) {
                    user[key] = userData[key]
                }
            }else{
                user = new userModel(userData);
            }
            user.save()
            .then(status => resolve(status))
            .catch(err => reject(err));
        });        
    });
}

deleteUser = userId => {
    console.log('Delete User Mongo Called');
    return new Promise((resolve, reject) => {
        userModel.deleteMany({id : userId})
        .then(status => {
            console.log('Delete User Mongo Called', status);
            resolve(status);
        })
        .catch(err => {
            reject(err);
        });
    });
}


module.exports = {
    addUser,
    deleteUser
}