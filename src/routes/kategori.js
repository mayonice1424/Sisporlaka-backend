import { createNewLaporanKategori,updateLaporanKategori,deleteLaporanKategori,getAllLaporanKategori, getLaporanKategoriById } from '../controller/kategori.js';
import express from 'express';
const router = express.Router();

router.post("/kategori", createNewLaporanKategori);
router.get("/kategori", getAllLaporanKategori); 
router.get("/kategori/:id", getLaporanKategoriById);
router.delete("/kategori/:id", deleteLaporanKategori);
router.patch("/kategori/:id", updateLaporanKategori);

export default router;