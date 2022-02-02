const express = require("express");
const {
  reqSubmit,
  getRequestP,
  getRequestA,
  getRequestR,
  updateRequest,
  rejectRequest,
  userRequestA,
  userRequestR,
  userRequestP,
} = require("../controller/request");
const {
  requireSignIn,
  userMiddleware,
  adminMiddleware,
  uploads3,
} = require("../middleware");
const router = express.Router();

router.post("/request", requireSignIn, userMiddleware, reqSubmit);
router.get("/get/request/pending", requireSignIn, adminMiddleware, getRequestP);
router.get(
  "/get/request/approved",
  requireSignIn,
  adminMiddleware,
  getRequestA
);
router.get(
  "/get/request/rejected",
  requireSignIn,
  adminMiddleware,
  getRequestR
);
router.post(
  "/request/update",
  requireSignIn,
  adminMiddleware,
  uploads3.array("productImage"),
  updateRequest
);
router.post(
  "/request/update/reject",
  requireSignIn,
  adminMiddleware,
  rejectRequest
);
router.get(
  "/user/requests/approved",
  requireSignIn,
  userMiddleware,
  userRequestA
);
router.get(
  "/user/requests/pending",
  requireSignIn,
  userMiddleware,
  userRequestP
);
router.get(
  "/user/requests/rejected",
  requireSignIn,
  userMiddleware,
  userRequestR
);

module.exports = router;
