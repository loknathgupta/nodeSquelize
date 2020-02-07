//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/testDB';

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Mongo = {
    connectDB : () => {
        return new Promise( (resolve, reject) => {
            mongoose.connect(mongoDB, { 
                useNewUrlParser: true ,
                useUnifiedTopology: true
            })
            .then(status => {
                console.log('MongoDB connected.')
                resolve(status)
            })
            .catch(err => reject(err));
        });
    } 
}


module.exports = Mongo;