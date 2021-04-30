const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
router.get("/home/:id", mainController.indexUser);
router.get("/search", mainController.search);
router.get("/db", mainController.list);

module.exports = router;
