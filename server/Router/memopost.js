var express = require("express");
var router = express.Router();
const multer = require("multer");

const { MemoCounter } = require("../Model/MemoCounter.js");
const { User } = require("../Model/User.js");
const { MemoPost } = require("../Model/MemoPost.js");

router.post("/memosubmit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    memocontent: req.body.memocontent,
    fromPage: req.body.fromPage,
    toPage: req.body.toPage,
  };
  MemoCounter.findOne({ name: "memocounter" })
    .exec()
    .then((memocounter) => {
      temp.postNum = memocounter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const MyPagePost = new MemoPost(temp);
          MyPagePost.save().then(() => {
            MemoCounter.updateOne({ name: "memocounter" }, { $inc: { postNum: 1 } }).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/memolist", (req, res) => {
  let sort = {};

  if (req.body.sort === "최신순") {
    sort.createdAt = -1;
  } else {
    //오래된 순
    sort.createdAt = +1;
  }

  MemoPost.find({
    $or: [{ title: { $regex: req.body.searchTerm } }, { content: { $regex: req.body.searchTerm } }, { memocontent: { $regex: req.body.searchTerm } }],
  })
    .populate("author")
    .sort(sort)
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/memodetail", (req, res) => {
  MemoPost.findOne({ postNum: Number(req.body.postNum) })
    .populate("author")
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/memoedit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    memocontent: req.body.memocontent,
    fromPage: req.body.fromPage,
    toPage: req.body.toPage,
  };
  MemoPost.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/memodelete", (req, res) => {
  MemoPost.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
