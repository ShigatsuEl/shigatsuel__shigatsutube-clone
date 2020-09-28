import express from "express";
import { postRegisterView } from "../controllers/videoControllers";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
