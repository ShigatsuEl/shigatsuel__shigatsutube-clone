import Comment from "../models/Comment";
import Reply from "../models/Reply";
import { dateFormatter } from "../middlewares";

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
