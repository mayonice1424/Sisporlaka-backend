import {createNewLaporan,deleteLaporan,getJumlahKorbanTiapLaporan,deleteLaporanPengemudi,getLaporanByBulan,updateLaporanPengemudi,getIdentitasPengemudi,getIdentitasSantunan,deleteIdentitasSantunan,createNewIdentitasSantunan,deleteKorban,countGrafik,createDetailLaporanPolisi,getAllLaporanBySearch,updateLaporan,  getLaporanById, countLaporan,getAllLaporanToValidate,updateStatusLaporan, countLaporanByKecamatanValidated,countLaporanByKecamatanUnValidated, createKorban, updateLaporanKorban,updateIdentitasSantunan,getAllLaporanToDownload } from "../controller/laporan.js";
import express from 'express';
const router = express.Router();

router.post("/laporan", createNewLaporan);
router.post("/laporandetail", createDetailLaporanPolisi);
router.delete("/laporan/:id", deleteLaporan);
router.get("/laporan", getAllLaporanBySearch);
router.post('/korban', createKorban);
router.delete('/korban/:id', deleteKorban);
router.post('/laporandetail', createDetailLaporanPolisi);
router.post('/identitassantunan', createNewIdentitasSantunan);
router.delete('/identitassantunan/:id', deleteIdentitasSantunan);
router.get('/laporan/:id', getLaporanById);
router.get('/laporanvalidate', getAllLaporanToValidate);
router.get('/count', countLaporan );
router.patch('/laporanstatus/:id', updateStatusLaporan);
router.get('/countkecamatan', countLaporanByKecamatanValidated);
router.get('/countkecamatanunvalidated', countLaporanByKecamatanUnValidated);
router.get('/countgrafik', countGrafik);
router.get('/santunankorban/:id', getIdentitasSantunan);
router.patch('/laporan/:id', updateLaporan);
router.patch('/korban/:id', updateLaporanKorban);
router.patch('/santunan/:id', updateIdentitasSantunan)
router.get('/pengemudi/:id',getIdentitasPengemudi);
router.patch('/pengemudi/:id',updateLaporanPengemudi);
router.delete('/pengemudi/:id',deleteLaporanPengemudi);
router.get('/grafik/:id', getLaporanByBulan);
router.get('/jumlahKorban/:id', getJumlahKorbanTiapLaporan);
router.get('/download', getAllLaporanToDownload) 


// router.patch
export default router;