var express = require("express");
var router = express.Router();

const { User } = require("../Model/User.js");

router.post("/getemail", (req, res) => {
  User.exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
