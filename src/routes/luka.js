import { createNewLuka,getAllLuka,getLukaById,deleteLuka,updateLuka } from "../controller/luka.js";
import express from 'express';
const router = express.Router();

router.post("/luka", createNewLuka);
router.get("/luka", getAllLuka);
router.get("/luka/:id", getLukaById);
router.delete("/luka/:id", deleteLuka);
router.patch("/luka/:id", updateLuka);


export default router;