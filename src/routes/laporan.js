import {createNewLaporan,deleteLaporan,updateLaporan,getAllLaporan, getLaporanById} from "../controller/laporan.js";
import express from 'express';
const router = express.Router();

router.post("/laporan", createNewLaporan);
router.delete("/laporan/:id", deleteLaporan);
router.patch("/laporan/:id", updateLaporan);
router.get("/laporan", getAllLaporan);
router.get("/laporan/:id", getLaporanById);

export default router;