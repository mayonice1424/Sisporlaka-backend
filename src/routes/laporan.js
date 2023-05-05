import {createNewLaporan,deleteLaporan,updateLaporan,getAllLaporanBySearch, getLaporanById, countLaporan, countLaporanByKecamatan, getAllLaporan } from "../controller/laporan.js";
import express from 'express';
const router = express.Router();

router.post("/laporan", createNewLaporan);
router.delete("/laporan/:id", deleteLaporan);
router.patch("/laporan/:id", updateLaporan);
router.get("/laporan", getAllLaporanBySearch);
router.get('/laporanall', getAllLaporan);
router.get("/laporan/:id", getLaporanById);
router.get('/count', countLaporan);
router.get('/countkecamatan', countLaporanByKecamatan);
export default router;