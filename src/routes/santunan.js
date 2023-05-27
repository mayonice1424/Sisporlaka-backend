import { createNewSantunan } from "../controller/santunan.js";
import express from 'express';
const router = express.Router();

router.post("/santunan", createNewSantunan);

export default router;