const express = require('express');
const { newFreight, getFreight, updateFreight, deleteFreight } = require('../controller/freightCat');
const { requireSignIn, adminMiddleware } = require('../middleware');
const router = express.Router();


router.post('/freight/create', requireSignIn, adminMiddleware, newFreight);
router.get('/freight/get', requireSignIn, getFreight);
router.post('/freight/update', requireSignIn, adminMiddleware, updateFreight);
router.post('/freight/delete', requireSignIn, adminMiddleware, deleteFreight);


module.exports = router;