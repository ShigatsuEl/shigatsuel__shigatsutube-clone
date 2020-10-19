import routes from "../routes";
import Video from "../models/Video";

// Home
export const home = async (req, res) => {
  try {
    let videos = await Video.find({})
      .populate("creator")
      .sort({ _id: -1 })
      .skip(1);
    videos = videos
      .sort(function (a, b) {
        return a.views > b.views ? -1 : a.views < b.views ? 1 : 0;
      })
      .slice(1);
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
    console.log(error);
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
    }).populate("creator");
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Upload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    creator: req.user.id,
    fileUrl: path,
    title,
    description,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
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
    console.log(error);
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
    res.redirect(routes.videoDetail(id));
  } catch (error) {
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
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
