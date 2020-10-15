import Comment from "../models/Comment";
import Reply from "../models/Reply";
import { dateFormatter } from "../middlewares";

// Add Reply Controller

export const postAddReply = async (req, res) => {
  const {
    params: { id: commentId },
    body: { reply },
  } = req;
  try {
    const newReply = await Reply.create({
      text: reply,
      creator: req.user.id,
      whichComment: commentId,
    });
    const comment = await Comment.findById(commentId);
    await comment.replies.push(newReply.id);
    comment.save();
    const parsedInfo = {
      name: newReply.creator.name,
      date: dateFormatter(newReply.createdAt),
      avatarUrl: newReply.creator.avatarUrl,
      reply,
      replyId: newReply.id,
    };
    res.json(parsedInfo);
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

// Edit Reply Controller

export const postEditReply = async (req, res) => {
  const {
    params: { id },
    body: { editReply },
  } = req;
  try {
    await Reply.findByIdAndUpdate({ _id: id }, { text: editReply });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

// Delete Reply Controller

export const postDeleteReply = async (req, res) => {
  const {
    params: { id: replyId },
    body: { commentId },
  } = req;
  try {
    await Reply.findByIdAndRemove({ _id: replyId });
    await Comment.updateOne(
      { _id: commentId },
      { $pull: { replies: replyId } }
    );
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
