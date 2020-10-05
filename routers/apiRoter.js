import express from "express";
import {
  postAddComment,
  postRegisterView,
  postEditComment,
} from "../controllers/commentController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);
apiRouter.post(routes.editComment, onlyPrivate, postEditComment);

export default apiRouter;
