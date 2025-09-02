import express from "express";
import { generateFeedback } from "../controllers/aiControllers.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.post(
  "/batches/:batchId/students/:studentId/feedback",
  verifyUser,
  generateFeedback
);

export default router;
