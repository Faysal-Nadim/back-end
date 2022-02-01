const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    invoiceID: {
        type: String,
        required: true
    },
    invoiceStatus: {
        type: String,
        enum: ['PAID', 'UNPAID', 'PARTIALLY PAID'],
        default: 'UNPAID',
        required: true
    },
    orderItems: [
        {
            request: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Request',
                required: true
            },
            freightCategory: {
                type: String,
                required: true
            },
            freightRate: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            itemPrice: {
                type: Number,
                required: true
            },
            reqStatus: {
                type: String,
                enum: ['pending', 'processing', 'purchased', 'received by agent', 'preparing for shipment', 'handover to airline', 'arrived at destination airport', 'released from customs', 'at alistorebd warehouse', 'delivered', 'canceled', 'refund initiated','processing for refund','refunded' ],
                default: 'pending'
            },
            itemWeight: {
                type: String,
            },
            itemShipping: {
                type: String
            },
            localShipping: {
                type: String
            },
            trackingID: {
                type: String
            }
        }
    ],
    totalPrice: {
        type: String,
        required: true
    },
    shippingTotal: {
        type: String
    },
    invoiceTotal: {
        type: String
    },
    totalItems: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: [ 'pending', 'processing', 'in transit', 'delivered', 'canceled', 'refunded' ],
        default: 'pending'
    },
    orderTime: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);