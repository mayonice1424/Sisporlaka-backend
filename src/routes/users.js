import {createNewUser, getUsers, login, updateUser, updatePassword} from "../controller/users.js";
import express from 'express';
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyPassword } from "../middleware/verifyPassword.js";

router.get("/users", verifyToken, getUsers);
router.post("/users", createNewUser);
router.post("/login", login);
router.post(`/users/change-password`, verifyToken, verifyPassword, updatePassword);

export default router;