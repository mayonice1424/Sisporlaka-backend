import { getAllKecamatan,getKecamatanById,updateKecamatan,createNewKecamatan,deleteKecamatan } from "../controller/kecamatan.js";
import express from 'express';
const router = express.Router();

router.post("/kecamatan", createNewKecamatan);
router.get("/kecamatan", getAllKecamatan);
router.get("/kecamatan/:id", getKecamatanById);
router.delete("/kecamatan/:id", deleteKecamatan);
router.patch("/kecamatan/:id", updateKecamatan);

export default router;