import express from "express";
import {
  postAddComment,
  postRegisterView,
} from "../controllers/commentController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);

export default apiRouter;
