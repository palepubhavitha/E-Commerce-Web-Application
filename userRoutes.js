const express = require("express");

const router = express.Router();

const {
  getUsers
} = require("../controllers/mainController");

router.get("/", getUsers);

module.exports = router;