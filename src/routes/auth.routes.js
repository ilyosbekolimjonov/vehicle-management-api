import { Router } from "express";
import { activateUser, deleteUser, getAll, login, register } from "../controller/auth.controller.js";

const UserRouter = Router()

UserRouter.post("/register", register)
UserRouter.post("/activate", activateUser)
UserRouter.post("/login", login)
UserRouter.get("/users", getAll)
UserRouter.delete("/users/:id", deleteUser)

export default UserRouter