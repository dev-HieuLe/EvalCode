import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import { exportBatchReport } from "../controllers/exportControllers.js";

const router = express.Router();
router.get("/:batchId", verifyUser, exportBatchReport);

export default router;
