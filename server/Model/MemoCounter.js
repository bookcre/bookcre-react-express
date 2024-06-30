const mongoose = require("mongoose");

const memocounterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
    userNum: Number,
  },
  { collection: "memocounter" }
);

const MemoCounter = mongoose.model("MemoCounter", memocounterSchema);

module.exports = { MemoCounter };
