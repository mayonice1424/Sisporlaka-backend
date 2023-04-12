import {createNewUser, getUsers, login, logout, updatePassword} from "../controller/users.js";
import express from 'express';
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyPassword } from "../middleware/verifyPassword.js";
import { refreshToken } from "../controller/token.js";

router.get("/users", verifyToken, getUsers);
router.post("/users", createNewUser);
router.post("/login", login);
router.get("/token", refreshToken);
router.get("/logout", logout);
router.delete(`/users/change-password`, verifyToken, verifyPassword, updatePassword);

export default router;