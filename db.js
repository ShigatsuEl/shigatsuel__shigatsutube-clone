import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ShigatsuTube", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Conneted to DB");

const handleError = (error) =>
  console.log(`❌  Error On DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
