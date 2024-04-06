import express from "express";
import EmployeeController from "../controller/employee.controller.js";

const EmployeeRouter = express.Router();

EmployeeRouter.get("/get/:uid", EmployeeController.getEmployee);

EmployeeRouter.get("/all", EmployeeController.allEmployee);

EmployeeRouter.post("/create", EmployeeController.createEmployee);

export default EmployeeRouter;