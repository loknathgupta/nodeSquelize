var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    id : String,
    name: String,
    email: { type: String, /*required: true, unique: true*/ },
    password: { type: String, /*required: true*/ },
    dp: String,
    status:String,
    created_at: Date,
    updated_at: Date
});

// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;