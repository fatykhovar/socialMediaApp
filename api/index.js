import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import groupRoutes from "./routes/groups.js"
import relationshipRoutes from "./routes/relationships.js";
import groupRelationshipRoutes from "./routes/groupRelationships.js";
import groupPostsRoutes from "./routes/groupPosts.js"
import locationRoutes from "./routes/location.js"
// import groupLikesRoutes from "./routes/groupLikes.js"
import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload/files");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadFile = multer({ storage: storageFile });

app.post("/api/upload/files", uploadFile.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/groupRelationships", groupRelationshipRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groupPosts", groupPostsRoutes);
app.use("/api/location", locationRoutes);
// app.use("/api/groupComments", groupCommentRoutes);
// app.use("/api/groupLikes", groupLikeRoutes);

app.listen(3001, (req, res) => {
    console.log("Server running...");
  });
  