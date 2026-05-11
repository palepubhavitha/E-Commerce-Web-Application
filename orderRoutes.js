const express = require("express");

const router = express.Router();

const {
  getOrders
} = require("../controllers/mainController");

router.get("/", getOrders);

module.exports = router;