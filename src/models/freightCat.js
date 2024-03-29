const mongoose = require('mongoose');

const freightCat = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    rate:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Freight', freightCat);