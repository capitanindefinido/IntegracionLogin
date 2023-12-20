import { Router } from "express"
import { createHash, isValidPassword } from '../utils.js'
import passport from "passport"
import UserController from "../controllers/users.controller.js"

const userRouter = Router()
const {
    postRegister, 
    getFailRegister, 
    getLogin, 
    getFailLogin, 
    getLogout, 
    getGithub, 
    getGithubCallback, 
    forgotPassword,
    resetPassword
} = new UserController()


userRouter.post("/register", passport.authenticate("register", {failureRedirect:"/failregister"}), postRegister)

userRouter.get("/failregister", getFailRegister)

userRouter.post("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}), getLogin)

userRouter.get("/faillogin", getFailLogin)

userRouter.get("/logout", getLogout)

userRouter.get("/github", passport.authenticate("github", {scope:["user:email"]}), getGithub)

userRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), getGithubCallback)

userRouter.post('/forgot-password', forgotPassword);

userRouter.post('/reset-password/:token', resetPassword);

export default userRouter