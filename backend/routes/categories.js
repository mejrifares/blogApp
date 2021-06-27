const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const NewCate = new Category(req.body);
  try {
    const saved = await NewCate.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get categories

router.get("/", async (req, res) => {
    try {
      const catego = await Category.find()
      res.status(200).json(catego);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
