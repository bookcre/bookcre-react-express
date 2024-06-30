const mongoose = require("mongoose");

const booklistSchema = new mongoose.Schema(
  {
    booktitle: String,
    readDate: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "booklists" }
);

const BookList = mongoose.model("BookList", booklistSchema);

module.exports = { BookList };
