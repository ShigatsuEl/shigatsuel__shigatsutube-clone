import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userControllers";
import User from "./models/User";

passport.use(
  new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback",
  }),
  githubLoginCallback
);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
