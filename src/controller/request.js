const Request = require("../models/request");
const User = require("../models/user");

exports.reqSubmit = async (req, res) => {
  const D = new Date();
  const {
    reqID,
    productLink,
    title,
    note,
    price,
    status,
    freightCat,
    estDelivery,
    shipFrom,
    requestedBy,
  } = req.body;

  const newRequest = new Request({
    reqID: `#${
      D.getMonth() + 1
    }${D.getDate()}${D.getMinutes()}${D.getSeconds()}`,
    productLink,
    title,
    note,
    price,
    status,
    freightCat,
    estDelivery,
    shipFrom,
    requestedBy: req.user._id,
  });
  await newRequest.save((error, request) => {
    if (error) return res.status(400).json({ error });
    if (request) {
      return res.status(201).json({ request });
    }
  });
};

exports.getRequestP = async (req, res) => {
  await Request.find({ status: "pending" }).exec((error, requests) => {
    if (error) return res.status(400).json({ error });
    if (requests) {
      return res.status(200).json({ requests });
    }
  });
};

exports.getRequestA = async (req, res) => {
  await Request.find({ status: "approved" })
    .populate({ path: "freightCat", select: "name rate" })
    .exec((error, requests) => {
      if (error) return res.status(400).json({ error });
      if (requests) {
        return res.status(200).json({ requests });
      }
    });
};

exports.getRequestR = async (req, res) => {
  await Request.find({ status: "rejected" }).exec((error, requests) => {
    if (error) return res.status(400).json({ error });
    if (requests) {
      return res.status(200).json({ requests });
    }
  });
};

exports.updateRequest = async (req, res) => {
  const {
    _id,
    productLink,
    title,
    note,
    price,
    status,
    freightCat,
    estDelivery,
    shipFrom,
  } = req.body;

  let productImage = [];
  if (req.files.length > 0) {
    productImage = req.files.map((file) => {
      return { img: file.location };
    });
  }
  const upReq = {
    productLink,
    title,
    note,
    price,
    productImage,
    status,
    freightCat,
    estDelivery,
    shipFrom,
  };
  await Request.findByIdAndUpdate(_id, upReq, { new: true }).exec(
    (error, upReq) => {
      if (error) return res.status(400).json({ error });
      if (upReq) {
        return res.status(201).json({ upReq });
      }
    }
  );
};

exports.rejectRequest = async (req, res) => {
  const { _id, status } = req.body;
  const newStatus = { status };
  await Request.findByIdAndUpdate(_id, newStatus, { new: true }).exec(
    (error, requestRejected) => {
      if (error) return res.status(400).json({ error });
      if (requestRejected) {
        return res.status(201).json({ requestRejected });
      }
    }
  );
};

exports.userRequestA = async (req, res) => {
  const { _id } = req.user;
  User.findOne({ _id: _id })
    .select("_id")
    .exec((error, user) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (user) {
        Request.find({ requestedBy: user._id, status: "approved" })
          .populate({ path: "freightCat", select: "name rate" })
          .exec((error, requests) => {
            if (requests) {
              return res.status(200).json({ requests });
            } else {
              return res.status(400).json({ error });
            }
          });
      }
    });
};

exports.userRequestP = async (req, res) => {
  const { _id } = req.user;
  User.findOne({ _id: _id })
    .select("_id")
    .exec((error, user) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (user) {
        Request.find({ requestedBy: user._id, status: "pending" }).exec(
          (error, requests) => {
            res.status(200).json({
              requests,
            });
          }
        );
      }
    });
};

exports.userRequestR = async (req, res) => {
  const { _id } = req.user;
  User.findOne({ _id: _id })
    .select("_id")
    .exec((error, user) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (user) {
        Request.find({ requestedBy: user._id, status: "rejected" }).exec(
          (error, requests) => {
            res.status(200).json({
              requests,
            });
          }
        );
      }
    });
};
