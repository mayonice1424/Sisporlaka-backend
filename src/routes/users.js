import {createNewUser, getUsers, login} from "../controller/users.js";
import express from 'express';
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
// import { refreshToken } from "../controller/RefreshToken.js";

router.get("/users", verifyToken, getUsers);
router.post("/users", createNewUser);
router.post("/login", login);
// router.get("/token", refreshToken);


export default router;