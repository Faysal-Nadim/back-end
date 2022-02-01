const express = require('express');
const { reqSubmit, getRequestP, getRequestA, getRequestR, updateRequest, rejectRequest, userRequestA, userRequestR, userRequestP } = require('../controller/request');
const { requireSignIn, userMiddleware, adminMiddleware } = require('../middleware');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage });

router.post('/request', requireSignIn, userMiddleware, reqSubmit);
router.get('/get/request/pending', requireSignIn, adminMiddleware, getRequestP);
router.get('/get/request/approved', requireSignIn, adminMiddleware, getRequestA);
router.get('/get/request/rejected', requireSignIn, adminMiddleware, getRequestR);
router.post('/request/update', requireSignIn, adminMiddleware, upload.array('productImage'), updateRequest);
router.post('/request/update/reject', requireSignIn, adminMiddleware, rejectRequest);
router.get('/user/requests/approved', requireSignIn, userMiddleware, userRequestA);
router.get('/user/requests/pending', requireSignIn, userMiddleware, userRequestP);
router.get('/user/requests/rejected', requireSignIn, userMiddleware, userRequestR);



module.exports = router;