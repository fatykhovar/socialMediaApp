import authRoutes from "./routes/auth.js";
import express from "express";
const app = express();
import cors from "cors";
// import multer from "multer";
// import cookieParser from "cookie-parser";

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
// app.use(cookieParser());
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const authRoute = require("./routes/auth");
// app.use("/auth", authRoute);
app.use("/api/auth", authRoutes);
app.listen(3001, (req, res) => {
    console.log("Server running...");
  });
  