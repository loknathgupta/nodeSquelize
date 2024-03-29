const express = require('express');
const multer = require('multer');
const db = require('../models/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');



let controller = {    
    login: (req, res, next) => {
        // if(req.body && req.body.email)
        db.users.findOne({where:{email:req.body.email}})
        .then(user => {
            console.log(process.env.JWT_KEY);
            if(user && bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign({email: user.email, userId:user.id},
                    process.env.JWT_KEY,
                    { 
                        expiresIn: '24h' // expires in 24 hours
                    }
                );

                console.log(token);
                return res.status(200).json({
                    status:'success',
                    message: "Logged-in Successfully.",
                    token : token
                });
            }
            return res.status(200).json({
                status:'error', 
                message: "Invalid log-in Details."
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err.message);
        });
    }
}
module.exports = controller;