const express = require("express");
const app = express();
const multer = require("multer")
const path = require("path");
const connectDB = require("./config/connectDB");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


//connect mongoDB
connectDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/categories", categoriesRoute);

//connect server
const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`the server is running at http://localhost:${port}`);
});
