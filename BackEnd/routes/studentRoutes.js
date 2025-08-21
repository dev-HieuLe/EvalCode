// studentRoutes.js
import express from "express";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../controllers/studentControllers.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router({ mergeParams: true });

// Nested under /batches/:batchId/students
router.get("/", verifyUser, getStudents);
router.post("/", verifyUser, addStudent);

// For single student operations
router.put("/:id", verifyUser, updateStudent);
router.delete("/:studentId", verifyUser, deleteStudent);

export default router;
