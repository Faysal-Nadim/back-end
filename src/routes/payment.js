const express = require('express');
const { createPayment, executePayment, getToken } = require('../controller/payment');
const router = express.Router();

router.get('/user/payment/bkash/token', getToken);
router.get('/user/payment/bkash/create', createPayment);
router.get('/user/payment/bkash/execute', executePayment);

module.exports = router;