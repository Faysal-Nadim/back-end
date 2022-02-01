const Cart = require('../models/cart');

exports.addToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {

                const request = req.body.cartItems.request;
                const item = cart.cartItems.find(c => c.request == request);
                let condition, updated;

                if (item) {
                    //If item already exists in the cart, updating the cart by increasing quantity.
                    condition = { user: req.user._id, "cartItems.request": request };
                    updated = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: item.quantity + + req.body.cartItems.quantity
                            }
                        }
                    };
                } else {
                    condition = { user: req.user._id };
                    updated = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    };
                }

                Cart.findOneAndUpdate(condition, updated)
                    .exec((error, _cart) => {
                        if (error) return res.status(400).json({ error });
                        if (_cart) {
                            res.status(201).json({ cart: _cart });
                        }
                    });
            } else {
                //New cart creation
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });

                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error });
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                });
            }
        });

}


exports.getCartItems = async (req, res) => {
    const _id = req.user._id;
    Cart.find({ user: _id })
        .populate({ path: 'cartItems.request cartItems.freightCat' })
        .exec((error, cart) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (cart) {
                return res.status(200).json({ cart });
            }
        })
}


exports.removeCart = (req, res) => {
    const requestID = req.body;
    if (requestID) {
        Cart.updateOne(
            { user: req.user._id },
            {
                $pull: {
                    cartItems: {
                        request: requestID
                    }
                },
            },
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    }
}