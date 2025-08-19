import express from "express";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../controllers/studentControllers.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

// studentRoutes.js
router.get("/:batchId", verifyUser, getStudents);
router.post("/:batchId", verifyUser, addStudent);
router.put("/:id", verifyUser, updateStudent);
router.delete("/:studentId", verifyUser, deleteStudent);


export default router;
