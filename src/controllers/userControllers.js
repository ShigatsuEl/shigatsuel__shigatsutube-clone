import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join Controller

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "Failed to Sign Up, Check your emial or password");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      res.status(400);
      res.redirect(routes.home);
    }
  }
};

// Local Login Controller

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome to ShigatsuTube!",
  failureFlash: "Failed to Log In, Check your email or password",
});

// Github Login Controller

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome to ShigatsuTube!",
  failureFlash: "Failed to Log In, Check your email or password",
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      // console.log(user);
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

// Google Login Controller

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
  successFlash: "Welcome to ShigatsuTube!",
  failureFlash: "Failed to Log In, Check your email or password",
});

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub: id, picture: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      // console.log(user);
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl,
      googleId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogIn = (req, res) => {
  res.redirect(routes.home);
};

// Logout Controller

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// Get Me Controoler

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "videos",
        populate: { path: "creator" },
      })
      .populate({ path: "likeVideos", populate: { path: "creator" } });
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// User Detail Controller

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id)
      .populate({
        path: "videos",
        populate: { path: "creator" },
      })
      .populate({ path: "likeVideos", populate: { path: "creator" } });
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Edit Controller

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("success", "Successfully edit your profile!");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Failed to edit your profile");
    res.redirect(routes.editProfile);
  }
};

// Change Password Controller

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash(
        "error",
        "Failed to change password, Make sure the passwords match"
      );
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "Successfully change your password!");
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
