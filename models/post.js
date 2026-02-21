import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Post", postSchema);