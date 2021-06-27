const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const UpdateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(UpdateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(404).json("you can olny update your profile");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: User.username });
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("user has been deleted..");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("user not found!");
    }
  } else {
    res.status(404).json("you can olny delete your profile");
  }
});

//get user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json;
  }
});

module.exports = router;
