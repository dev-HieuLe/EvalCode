import express from "express";
import { getBatches, createBatch, updateBatch, deleteBatch,getBatchById } from "../controllers/batchControllers.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/", verifyUser, getBatches);
router.post("/", verifyUser, createBatch);
router.get("/:batchId", verifyUser, getBatchById);
router.put("/:batchId", verifyUser, updateBatch);
router.delete("/:batchId", verifyUser, deleteBatch);

export default router;
