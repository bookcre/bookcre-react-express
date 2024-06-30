const mongoose = require("mongoose");

const memopostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    memocontent: String,
    postNum: Number,
    fromPage: Number,
    toPage: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "memoposts" }
);

const MemoPost = mongoose.model("MemoPost", memopostSchema);

module.exports = { MemoPost };
