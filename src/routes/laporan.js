import {createNewLaporan,deleteLaporan,updateLaporan} from "../controller/laporan.js";
import express from 'express';
const router = express.Router();

router.post("/laporan", createNewLaporan);
router.delete("/laporan/:id", deleteLaporan);
router.patch("/laporan/:id", updateLaporan);

export default router;