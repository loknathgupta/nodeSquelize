const express = require('express');
const multer = require('multer');
const db = require('../models');

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
})

var upload = multer({ storage: storage });

let controller = {
    uploadDP: upload,

    getList: (req, res, next) => {
        let conditions = {};
        if(req.params.id > 0){
            conditions['id'] = req.params.id;
        }
        console.log(conditions);
        db.users.findAll({
            where : conditions
        })
        .then(users => {
            res.status(200).json(users);
        })
    },
    add: (req, res, next) => {
        let userId = req.body.id;
        if(userId >=1){
            db.users.findByPk(userId)
            .then(user => {
                let dataToUpdate = {
                    name : req.body.username
                }
                if(req.file){
                    dataToUpdate.dp = req.file.filename;
                }
                user.update(dataToUpdate)
                .then(updatedUser => {
                    res.status(200).json(updatedUser);
                })
                
            })
            .catch(err => {
                res.status(500).json(err);
            });
        }else{
            let user = new db.users();
            
            user.name = req.body.username;
            user.status = 'E';
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
    edit: (req, res, next) => {
        let userId = req.body.id;
        if(userId >=1){

        }
        let user = new db.users();
        
        user.name = req.body.username;
        user.status = 'E';
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
    },

    deleteUser : (req, res, next) => {
        console.log(req.body);
        
        let userId = req.body.id;
        if(userId >=1){
            db.users.destroy({where: {id:userId}})
            .then(user => {
                res.status(200).json(user);                
            });            
        }
    }
}
module.exports = controller;