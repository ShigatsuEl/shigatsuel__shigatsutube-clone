import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: "Add a Public Comment...",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
