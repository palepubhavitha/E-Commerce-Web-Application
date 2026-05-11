const express = require("express");

const router = express.Router();

const {
  getProducts
} = require("../controllers/mainController");

router.get("/", getProducts);

module.exports = router;