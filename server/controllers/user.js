const express = require('express');
const multer = require('multer');
const db = require('../models/sequelize');
const userMongoController = require('./mongo/usersController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {        
        cb(null, 'uploads/profile-pictures')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
});

var upload = multer({ storage: storage });

let controller = {
    uploadDP: upload,

    getList: (req, res, next) => {        
        let conditions = {};
        if(req.params.id > 0){
            conditions['id'] = req.params.id;
        }
        //console.log(conditions);
        db.users.findAll({
            where : conditions,
            include: [{
                model: db.comments
            }],
            //order: [ [ { model: db.comments}, 'createdAt', 'DESC' ] ]
        })
        .then(users => {
            //console.log('comments', users[0].comments);
            res.status(200).json(users);
        })
    },
    add: (req, res, next) => {
        let userId = req.body.id;
        let password = null;
        if(req.body.password){
            password = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_SALTROUNDS));
        }
        if(userId >= 1){
            console.log('file', req.file);
            db.users.findByPk(userId)
            .then(user => {
                let dataToUpdate = {
                    name : req.body.username,
                    // email : req.body.email,
                }
                if(password !== null){
                    // dataToUpdate.password = password;
                }
                if(req.file){
                    let filePath = 'uploads/profile-pictures/'+user.dp;
                    console.log('filePath', filePath);
                    if (fs.existsSync(filePath)) {
                        console.log('Delete old DP');
                        fs.unlinkSync(filePath);
                        // Do something
                    }
                    dataToUpdate.dp = req.file.path;
                }
                user.update(dataToUpdate)
                .then(updatedUser => {
                    userMongoController.addUser(user.dataValues)
                    .then(status => {
                        res.status(200).json({
                            "status": "success",
                            "message": "User Updated.",
                        });
                    })
                    .catch(err => {
                        console.log('err', err);
                        res.status(500).json({
                            "status": "error",
                            "message": err.message,
                        });
                    });
                });
            })
            .catch(err => {
                console.log('err', err);
                res.status(500).json({
                    "status": "error",
                    "message": err.message,
                });
            });
        }else{
            let user = new db.users();            
            user.name = req.body.username;
            user.email = req.body.email;
            user.status = 'E';
            if(password !== null){
                user.password = password;
            }
            if(req.file){
                user.dp = req.file.path;
            }
            user.save()
            .then(staus => {
                userMongoController.addUser(user.dataValues)
                .then(status => {
                    res.status(200).json({
                        "status": "success",
                        "message": "User Saved.",
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(200).json({
                        "status": "error",
                        "message": err.message,
                    });
                });
                
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    "status": "error",
                    "message": err.message,
                });
            });
        }
    },
    login: (req, res, next) => {
        db.users.findOne({where:{email:req.body.email}})
        .then(user => {
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign({email: user.email},
                    process.env.JWT_KEY,
                    { 
                        expiresIn: '12h' // expires in 24 hours
                    }
                );

                console.log(token);
                res.status(200).json({
                    status:'success',
                    message: "Logged-in Successfully.",
                    token : token
                });
            }
            res.status(200).json({
                status:'error', 
                message: "Invalid log-in Details."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
        



        // let userId = req.body.id;
        // if(userId >=1){

        // }
        // let user = new db.users();

        // user.name = req.body.username;
        // user.status = 'E';
        // if(req.file){
        //     user.dp = req.file.filename;
        // }
        // user.save()
        // .then(staus => {
        //     res.status(200).json(req.file);
        // })
        // .catch(err => {
        //     res.status(500).json(err);
        // });
    },
    deleteUser : (req, res, next) => {
        
        let userId = req.body.id;
        if(userId >=1){
            db.users.destroy({where: {id:userId}})
            .then(user => {
                console.log('UserDeleted');
                userMongoController.deleteUser(userId)
                .then(status => {
                    console.log('YYYYYYYYYYYYYYYY', status);
                    res.status(200).json({
                        status:'success', 
                        message : 'User Deleted.'
                    });  
                })
                .catch(err => {
                    res.status(200).json({
                        status:'error', 
                    }); 
                });  
                              
            })
            .catch(err => {
                res.status(200).json({
                    status:'error', 
                }); 
            });            
        }
    },

    viewProfile : (req, res, next) => {
        let conditions  = {email : res.locals.decodedToken.email};
        db.users.findOne({
            where : conditions
        })
        .then(users => {
            res.status(200).json(users);
        })
    },
    addComment: (req, res, next) => { 
        console.log(res.locals);       
        let comment = new db.comments();            
        comment.comment = req.body.comment;
        comment.user_id = res.locals.decodedToken.userId;
        
        comment.save()
        .then(staus => {
            res.status(200).json(staus);
        })
        .catch(err => {
            console.log(err);
            res.status(200).json(err);
        });
    }
}
module.exports = controller;