// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors');
const db =  require('./models/');
const routers =  require('./routers');
require('dotenv').config();
 
//CREATE EXPRESS APP
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
//ROUTES WILL GO HERE
app.use('/', routers);
 
app.listen(4001, () => {
    console.log('Server started on port 4001');
    // db.users.findAll()
    // .then(users => {
    //     //console.log('users', users);
    // })
});