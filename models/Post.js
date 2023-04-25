const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  data: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", postSchema);
