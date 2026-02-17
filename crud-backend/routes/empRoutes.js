import express from "express"
import { createEmployee, deleteEmployee, getEmployees, searchEmployee, updateEmployee } from "../controllers/empController.js";

const router = express.Router()

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/search", searchEmployee);
export default router;