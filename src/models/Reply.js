import mongoose from "mongoose";

const ReplySchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: "Add a Public Reply...",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  whichComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  heart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const model = mongoose.model("Reply", ReplySchema);
export default model;
