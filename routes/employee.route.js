import express from "express";
import EmployeeController from "../controller/employee.controller.js";

const EmployeeRouter = express.Router();

// EmployeeRouter.get("/", EmployeeController.allEmployee);

EmployeeRouter.get("/", () => {
	return res.status(201).json({employee: "employee"});
});

EmployeeRouter.post("/", EmployeeController.createEmployee);

export default EmployeeRouter;