import express from "express";
import Post from "../models/post.js";
import upload from "../middleware/uploads.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// Feed with pagination (4 per page)
router.get("/feed", isAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.render("feed", { posts, page });

  } catch (error) {
    console.log(error);
    res.send("Feed error");
  }
});

// Create Post
router.post("/create", isAuth, upload.single("image"), async (req, res) => {
  try {
    await Post.create({
      caption: req.body.caption,
      image: req.file.filename,
      user: req.user.id
    });

    res.redirect("/feed");

  } catch (error) {
    console.log(error);
    res.send("Create post error");
  }
});

// Update Post
router.post("/update/:id", isAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.send("Unauthorized");
    }

    post.caption = req.body.caption;
    await post.save();

    res.redirect("/feed");

  } catch (error) {
    console.log(error);
    res.send("Update error");
  }
});

// Delete Post
router.post("/delete/:id", isAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.send("Unauthorized");
    }

    await post.deleteOne();
    res.redirect("/feed");

  } catch (error) {
    console.log(error);
    res.send("Delete error");
  }
});

export default router;