import {createNewIdentitasKorban,updateIdentitasKorban, getAllIdentitasKorban, getIdentitasKorbanById, deleteIdentitasKorban} from "../controller/identitasKorban.js";
import express from 'express';
const router = express.Router();

router.post("/identitaskorban", createNewIdentitasKorban);
router.get("/identitaskorban/:id", getIdentitasKorbanById);
// router.get("/identitaskorban/:id", getIdentitasKorbanById);
router.delete("/identitaskorban/:id", deleteIdentitasKorban);
router.patch("/identitaskorban/:id", updateIdentitasKorban);

export default router;
