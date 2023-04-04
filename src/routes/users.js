import {createNewUser, getUsers} from "../controller/users.js";
import express from 'express';
const router = express.Router();

router.post("/users", createNewUser);
router.get("/users", getUsers);


export default router;