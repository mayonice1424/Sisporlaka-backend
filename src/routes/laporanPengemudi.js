import {createNewLaporanPengemudi,getAllLaporanPengemudi,getLaporanPengemudiById,deleteLaporanPengemudi,updateLaporanPengemudi,} from "../controller/laporanPengendara.js";
import express from 'express';
const router = express.Router();

router.post("/laporanpengemudi", createNewLaporanPengemudi);
router.get("/laporanpengemudi", getAllLaporanPengemudi);
router.get("/laporanpengemudi/:id", getLaporanPengemudiById);
router.delete("/laporanpengemudi/:id", deleteLaporanPengemudi);
router.patch("/laporanpengemudi/:id", updateLaporanPengemudi);

export default router;