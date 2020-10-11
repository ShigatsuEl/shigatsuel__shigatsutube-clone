import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: "Add a Public Comment...",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  heart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply"
    }
  ]
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
