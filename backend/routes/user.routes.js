const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  logout,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/user", verifyToken, getUser);
userRouter.post("/logout", verifyToken, logout);
module.exports = userRouter;
