const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Create User REGISTER

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const NewUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user
    const user = await NewUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log In USER

router.post("/login", async (req, res) =>{
  try {
    const user = await User.findOne({
      username : req.body.username
    })
    !user && res.status(404).json("wrong username");

    const validate = await bcrypt.compare(req.body.password , user.password);
    !validate && res.status(404).json("wrong password");

    const {password, ...other} = user._doc

    res.status(200).json(other)
    
  } catch (err) {
    res.status(500).json(err)
    
  }

})


module.exports = router;
