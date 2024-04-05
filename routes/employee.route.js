import express from "express";
import EmployeeController from "../controller/employee.controller.js";

const EmployeeRouter = express.Router();

EmployeeRouter.get("/", EmployeeController.allEmployee);

EmployeeRouter.post("/", EmployeeController.createEmployee);

export default EmployeeRouter;