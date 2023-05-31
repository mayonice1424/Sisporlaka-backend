import {createNewIdentitasKorban,updateIdentitasKorban, getAllIdentitasKorban, getIdentitasKorbanById, deleteIdentitasKorban} from "../controller/identitasKorban.js";
import express from 'express';
const router = express.Router();

router.post("/identitaskorban", createNewIdentitasKorban);
router.get("/identitaskorban/:id", getIdentitasKorbanById);
router.get("/identitas/:id", getAllIdentitasKorban);
router.delete("/identitaskorban/:id", deleteIdentitasKorban);
router.patch("/identitaskorban/:id", updateIdentitasKorban);

export default router;
