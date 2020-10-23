import express from "express";
import { postLikeVideo } from "../controllers/videoControllers";
import {
  postAddComment,
  postRegisterView,
  postEditComment,
  postDeleteComment,
  postHeartComment,
} from "../controllers/commentController";
import {
  postAddReply,
  postDeleteReply,
  postEditReply,
  postHeartReply,
} from "../controllers/replyController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.likeVideo, onlyPrivate, postLikeVideo);
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);
apiRouter.post(routes.heartComment, onlyPrivate, postHeartComment);
apiRouter.post(routes.editComment, onlyPrivate, postEditComment);
apiRouter.post(routes.deleteComment, onlyPrivate, postDeleteComment);
apiRouter.post(routes.addReply, onlyPrivate, postAddReply);
apiRouter.post(routes.editReply, onlyPrivate, postEditReply);
apiRouter.post(routes.deleteReply, onlyPrivate, postDeleteReply);
apiRouter.post(routes.heartReply, onlyPrivate, postHeartReply);

export default apiRouter;
