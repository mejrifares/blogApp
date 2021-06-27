const router = require("express").Router();
const Post = require("../models/Post");

const bcrypt = require("bcrypt");

//creat post
router.post("/", async (req, res) => {
  const NewPost = new Post(req.body);
  try {
    const post = await NewPost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const UpdatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(UpdatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json("you can update only your account");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        await post.delete();

        res.status(200).json("post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json("you can delete only your account");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
