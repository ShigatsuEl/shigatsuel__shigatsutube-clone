import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import { dateFormatter } from "../middlewares";

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// Add a Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
  } = req;
  try {
    const newComment = await Comment.create({
      text: comment,
      creator: req.user.id,
    });

    const video = await Video.findById(id);
    video.comments.push(newComment.id);
    video.save();

    const user = await User.findById(newComment.creator);
    user.comments.push(newComment.id);
    user.save();

    const parsedInfo = {
      name: user.name,
      date: dateFormatter(newComment.createdAt),
      avatarUrl: user.avatarUrl,
      comment,
      commentId: newComment.id,
    };
    res.json(parsedInfo);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Edit Comment

export const postEditComment = async (req, res) => {
  const {
    params: { id },
    body: { editComment },
  } = req;
  try {
    await Comment.findByIdAndUpdate({ _id: id }, { text: editComment });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};
