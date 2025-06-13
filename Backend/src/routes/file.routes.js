import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { uploadFile,getMyFiles,getFileByShortId,deleteFile } from "../controllers/file.controller.js";

const router = express.Router();

router.post("/upload", verifyJWT, upload.single("file"), uploadFile);
router.get("/my", verifyJWT, getMyFiles);
router.get("/:shortId", getFileByShortId);
router.delete("/:id", verifyJWT, deleteFile);

export default router;