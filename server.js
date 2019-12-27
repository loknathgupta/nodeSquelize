// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors');
const db =  require('./models/');
const routers =  require('./routers');
 
//CREATE EXPRESS APP
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.static('uploads/profile-pictures'))
//ROUTES WILL GO HERE
app.use('/', routers);
 
app.listen(4000, () => {
    console.log('Server started on port 4000');
    // db.users.findAll()
    // .then(users => {
    //     //console.log('users', users);
    // })
});