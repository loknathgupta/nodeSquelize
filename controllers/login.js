const express = require('express');
const multer = require('multer');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');



let controller = {    
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
    }
}
module.exports = controller;