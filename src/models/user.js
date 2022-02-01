const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hash_password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phone:{
        type: String,
        required: true
    },
    profilePicture:[{
        img: { type: String }
    }],
    division:{
        type: String
    },
    district: {
        type: String
    },
    thana: {
        type: String
    },
    deliveryAddress:{
        type: String
    }
}, {
    timestamps: true
});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual('fullName')
.get(function(fullName){
    return `${this.firstName} ${this.lastName}`
});

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);