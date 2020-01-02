const express = require('express');
const multer = require('multer');
const db = require('../models');
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
        //console.log(process.env.BCRYPT_SALTROUNDS);
        let conditions = {};
        if(req.params.id > 0){
            conditions['id'] = req.params.id;
        }
        //console.log(conditions);
        db.users.findAll({
            where : conditions
        })
        .then(users => {
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
            db.users.findByPk(userId)
            .then(user => {
                let dataToUpdate = {
                    name : req.body.username,
                    email : req.body.email,
                }
                if(password !== null){
                    dataToUpdate.password = password;
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
                console.log('dataToUpdate', dataToUpdate);
                user.update(dataToUpdate)
                .then(updatedUser => {
                    res.status(200).json(updatedUser);
                })
                
            })
            .catch(err => {
                console.log('err', err);
                res.status(500).json(err);
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
                user.dp = req.file.filename;
            }
            user.save()
            .then(staus => {
                res.status(200).json(req.file);
            })
            .catch(err => {
                res.status(500).json(err);
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
                        expiresIn: '24h' // expires in 24 hours
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
                res.status(200).json({
                    status:'success', 
                    user
                });                
            })
            .catch(err => {
                res.status(200).json({
                    status:'error', 
                }); 
            });            
        }
    }
}
module.exports = controller;