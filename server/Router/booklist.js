var express = require("express");
var router = express.Router();

const { User } = require("../Model/User.js");
const { BookList } = require("../Model/BookList.js");

router.post("/booksubmit", (req, res) => {
  let temp = {
    booktitle: req.body.booktitle,
    readDate: req.body.readDate,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const BookListPost = new BookList(temp);
      BookListPost.save().then(() => {
        res.status(200).json({ success: true });
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/showbooklist", (req, res) => {
  let sort = {};
  sort.createdAt = -1;
  BookList.find()
    .populate("author")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
