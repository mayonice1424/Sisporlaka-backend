import { createNewSkalaTriase } from "../controller/skalaTriase.js";
import express from 'express';
const router = express.Router();

router.post("/skala", createNewSkalaTriase);

export default router;