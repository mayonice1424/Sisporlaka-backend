import { createNewSkalaTriase,getAllSkalaTriase } from "../controller/skalaTriase.js";
import express from 'express';
const router = express.Router();

router.post("/skala", createNewSkalaTriase);
router.get("/skala", getAllSkalaTriase);

export default router;