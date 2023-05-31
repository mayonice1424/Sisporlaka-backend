import { createNewSantunan,getAllSantunan } from "../controller/santunan.js";
import express from 'express';
const router = express.Router();

router.post("/santunan", createNewSantunan);
router.get("/santunan", getAllSantunan);

export default router;