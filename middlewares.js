import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "ShigatsuTube";
  res.locals.routes = routes;
  next();
};
