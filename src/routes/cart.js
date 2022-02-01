const express = require('express');
const { addToCart, getCartItems, removeCart } = require('../controller/cart');
const { requireSignIn, userMiddleware } = require('../middleware');
const router = express.Router();


router.post('/cart/create', requireSignIn, userMiddleware, addToCart);
router.get('/cart/get', requireSignIn, userMiddleware, getCartItems);
router.post('/cart/remove', requireSignIn, userMiddleware, removeCart);

module.exports = router;