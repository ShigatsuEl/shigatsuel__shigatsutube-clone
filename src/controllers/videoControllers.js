import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";

// Home
export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate("creator")
      .sort({ _id: -1 })
      .skip(1)
      .sort({ views: -1 })
      .skip(1);
    const lastVideo = await Video.find({})
      .populate("creator")
      .sort({ _id: -1 })
      .limit(1);
    const bestVideo = await Video.find({})
      .populate("creator")
      .sort({ views: -1 })
      .limit(1);
    res.render("home", { pageTitle: "Home", videos, lastVideo, bestVideo });
  } catch (error) {
    res.status(400);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// Search
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    })
      .populate("creator")
      .sort({ _id: -1 });
  } catch (error) {
    res.status(400);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Upload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  // console.log(req.file);
  try {
    const newVideo = await Video.create({
      creator: req.user.id,
      fileUrl: location,
      title,
      description,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    req.flash("success", "Successfully upload video!");
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    req.flash("error", "Failed to upload video");
    res.status(400);
  }
};

// Video Detail
export const videoDetail = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({ path: "comments", populate: { path: "creator" } })
      .populate({
        path: "comments",
        populate: { path: "replies", populate: { path: "creator" } },
      });
    res.render("videoDetail", { pageTitle: video.title, video, user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

//Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    req.flash("success", "Successfully edit your video!");
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    req.flash("error", "Failed to edit your video");
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
      req.user.videos.pop(id);
      req.user.save();
    }
    req.flash("error", "Successfully delete your video!");
  } catch (error) {
    req.flash("error", "Failed to delete your video");
    res.status(400);
  }
  res.redirect(routes.home);
};

// Like or Dislike Video
export const postLikeVideo = async (req, res) => {
  const {
    params: { id: videoId },
    body: { isLikeBtn, isSelected, isSwitching, userId },
  } = req;
  try {
    const video = await Video.findById(videoId);
    const user = await User.findById(userId);
    const { likeVideos } = user;
    const { dislikeVideos } = user;
    // likebtn이 맞고 선택되어있는 상태라면 클릭하면 like를 삭제
    // likebtn이 맞고 선택되어있지 않은 상태에서 스위칭 상태가 맞으면 like++ dislike--
    // likebtn이 맞고 선택되지 않은 상태라면 like를 추가
    if (isLikeBtn) {
      if (isSelected) {
        video.like--;
        likeVideos.splice(likeVideos.indexOf(videoId), 1);
      } else if (isSwitching) {
        video.like++;
        video.dislike--;
        if (likeVideos.indexOf(videoId) === -1) likeVideos.push(videoId);
        dislikeVideos.splice(dislikeVideos.indexOf(videoId), 1);
      } else {
        video.like++;
        if (likeVideos.indexOf(videoId) === -1) likeVideos.push(videoId);
      }
      // dislikebtn이 맞고 선택되어있는 상태라면 클릭하면 dislike를 삭제
      // dislikebtn이 맞고 선택되어있지 않은 상태에서 스위칭 상태가 맞으면 dislike++ like--
      // dislikebtn이 맞고 선택되지 않은 상태라면 dislike를 추가
    } else if (isSelected) {
      video.dislike--;
      dislikeVideos.splice(dislikeVideos.indexOf(videoId), 1);
    } else if (isSwitching) {
      video.dislike++;
      video.like--;
      if (dislikeVideos.indexOf(videoId) === -1) dislikeVideos.push(videoId);
      likeVideos.splice(likeVideos.indexOf(videoId), 1);
    } else {
      video.dislike++;
      if (dislikeVideos.indexOf(videoId) === -1) dislikeVideos.push(videoId);
    }
    video.save();
    user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
