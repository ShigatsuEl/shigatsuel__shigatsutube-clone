import express from "express";
import {
  postAddComment,
  postRegisterView,
  postEditComment,
  postDeleteComment,
  postHeartComment,
} from "../controllers/commentController";
import { postAddReply, postEditReply } from "../controllers/replyController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);
apiRouter.post(routes.heartComment, onlyPrivate, postHeartComment);
apiRouter.post(routes.editComment, onlyPrivate, postEditComment);
apiRouter.post(routes.deleteComment, onlyPrivate, postDeleteComment);
apiRouter.post(routes.addReply, onlyPrivate, postAddReply);
apiRouter.post(routes.editReply, onlyPrivate, postEditReply);

export default apiRouter;
