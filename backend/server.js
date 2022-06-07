require("dotenv").config({ path: "./hidden.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./Post.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://localhost:27017/bikroy",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MongoDB Connected");
  }
);

//Image Upload Middleware
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  console.log("Working");

  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

app.post("/addPost", upload.array("images", 5), async (req, res) => {
  const {
    category,
    location,
    con,
    brand,
    model,
    title,
    description,
    price,
    phone,
  } = req.body;

  console.log(req.body);

  const images = [];

  await req.files.map((file) => {
    images.push(file.path);
  });

  try {
    const post = await Post.create({
      category: category,
      location: location,
      condition: con,
      images: images,
      brand: brand,
      model: model,
      title: title,
      description: description,
      price: price,
      phone: phone,
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
