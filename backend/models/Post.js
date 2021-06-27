const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    postPic: {
      type: String,
      require: false,
    },
    categories: {
      type: Array,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
