import { createNewIcd10,getAllIcd10,getIcd10ById,deleteIcd10,updateIcd10 } from '../controller/icd-10.js';
import express from 'express';
const router = express.Router();

router.post("/icd-10", createNewIcd10);
router.get("/icd-10", getAllIcd10);
router.get("/icd-10/:id", getIcd10ById);
router.delete("/icd-10/:id", deleteIcd10);
router.patch("/icd-10/:id", updateIcd10);

export default router;