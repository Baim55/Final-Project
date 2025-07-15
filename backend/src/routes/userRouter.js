import express from "express";
import {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/userController.js";
import upload from "../upload/upload.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.get("/verify", verifyEmail);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/resetpassword", resetPassword);
userRouter.get("/me", getMe);

export default userRouter;
