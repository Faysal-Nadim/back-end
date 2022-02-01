const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    reqID:{
        type: String
    },
    productLink:{
        type: String,
        required: true
    },
    title:{
        type: String
    },
    note:{
        type: String
    },
    price:{
        type: Number
    },
    productImage:[{
        img: { type: String }
    }],
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    freightCat:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Freight'
    },
    estDelivery:{
        type: String
    },
    shipFrom:{
        type: String,
        enum: ['China', 'USA', 'UK']
    },
    requestedBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Request', reqSchema);