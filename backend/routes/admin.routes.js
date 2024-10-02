import express from "express"
import { loginAdmin, logout, signUpAdmin } from "../controller/admin.controller.js";

const adminRouter = express.Router()

adminRouter.route("/signup").post(signUpAdmin)
adminRouter.route("/signin").post(loginAdmin)
adminRouter.route("/logout").get(logout)


export default adminRouter;