const express = require('express');
const { orderPlaced, getOrder, getAllOrder, updateProduct, updatedOrder } = require('../controller/order');
const { requireSignIn, userMiddleware, adminMiddleware } = require('../middleware');
const router = express.Router();


router.post('/user/placeorder', requireSignIn, userMiddleware, orderPlaced);
router.get('/user/getorder', requireSignIn, userMiddleware, getOrder);
router.get('/admin/getorder', requireSignIn, adminMiddleware, getAllOrder);
router.post('/admin/product/update', requireSignIn, adminMiddleware, updateProduct);
router.post('/admin/order/update', requireSignIn, adminMiddleware, updatedOrder);

module.exports = router;