const Order = require("../models/order");

exports.orderPlaced = async (req, res) => {
    const D = new Date();
    const {
        orderItems,
        invoiceStatus,
        totalPrice,
        totalItems,
        orderStatus,
        orderTime
    } = req.body;
    const order = new Order({
        user: req.user._id,
        orderID: `#ASB${D.getMonth() + 1}${D.getDate()}${D.getMinutes()}${D.getSeconds()}`,
        invoiceID: `#ASB${D.getMonth() + 1}${D.getDate()}${D.getMinutes()}${D.getSeconds()}`,
        invoiceStatus,
        orderItems: req.body.orderItems,
        totalPrice,
        totalItems,
        orderStatus,
        orderTime: `${D.toLocaleString()}`
    });
    await order.save((error, order) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (order) {
            return res.status(201).json({
                order
            })
        }
    })
}


exports.getOrder = async (req, res) => {
    const _id = req.user._id;
    Order.find({ user: _id })
        .populate({ path: 'orderItems.request' })
        .exec((error, order) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (order) {
                return res.status(200).json({
                    order
                })
            }
        })
}


exports.getAllOrder = async (req, res) => {
    Order.find()
        .populate({ path: 'orderItems.request' })
        .exec((error, orders) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (orders) {
                return res.status(200).json({
                    orders
                })
            }
        })
}

exports.updateProduct = async (req, res) => {
    const { id, _id, quantity, freightRate, reqStatus, itemPrice, request, freightCategory, price } = req.body;
    const conditions = { _id: _id, "orderItems._id": id }
    await Order.findOneAndUpdate(
        conditions,
        {
            "$set": {
                "orderItems.$": {
                    quantity: quantity,
                    freightRate: freightRate,
                    reqStatus: reqStatus,
                    itemPrice: itemPrice,
                    request: request,
                    freightCategory: freightCategory,
                    price: price
                }
            }
        }
    )
        .exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(201).json({ result });
            }
        })
}


exports.updatedOrder = async (req, res) => {
    const { _id, orderStatus, invoiceStatus, totalPrice } = req.body;
    const newOrders = { orderStatus, invoiceStatus, totalPrice };
    await Order.findByIdAndUpdate( _id, newOrders, { new: true })
        .exec((error, upOrder) => {
            if (error) return res.status(400).json({ error });
            if (upOrder) {
                res.status(201).json({ upOrder });
            }
        })
}