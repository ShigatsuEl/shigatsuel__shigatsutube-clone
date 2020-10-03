import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "ShigatsuTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  res.locals.dateFormatter = dateFormatter;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const dateFormatter = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  } ${date.getHours()}시 ${date.getMinutes()}분`;
};
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
