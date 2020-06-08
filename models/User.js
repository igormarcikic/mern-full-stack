const { model, Schema } = require('mongoose');

userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String
});

const User = model('User', userSchema);
module.exports = User;