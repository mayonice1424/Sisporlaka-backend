import {createNewLaporan,deleteLaporan,updateLaporan,getAllLaporanBySearch,  getLaporanById, countLaporan,getAllLaporanToValidate,updateStatusLaporan, countLaporanByKecamatanValidated,countLaporanByKecamatanUnValidated, getAllLaporan } from "../controller/laporan.js";
import express from 'express';
const router = express.Router();

router.post("/laporan", createNewLaporan);
router.delete("/laporan/:id", deleteLaporan);
router.patch("/laporan/:id", updateLaporan);
router.get("/laporan", getAllLaporanBySearch);
router.get('/laporanall', getAllLaporan);
router.get("/laporan/:id", getLaporanById);
router.get('/laporanvalidate', getAllLaporanToValidate);
router.get('/count', countLaporan );
router.patch('/laporanstatus/:id', updateStatusLaporan);
router.get('/countkecamatan', countLaporanByKecamatanValidated);
router.get('/countkecamatanunvalidated', countLaporanByKecamatanUnValidated);
export default router;