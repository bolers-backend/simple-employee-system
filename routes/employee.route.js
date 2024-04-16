import express from "express";
import EmployeeController from "../controller/employee.controller.js";

const EmployeeRouter = express.Router();

// localhost:3000/employee/get/uid_nya GET
EmployeeRouter.get("/get/:uid", EmployeeController.getEmployeeByUID);

// localhost:3000/employee/all GET
EmployeeRouter.get("/all", EmployeeController.allEmployees);

// localhost:3000/employee/create POST
EmployeeRouter.post("/create", EmployeeController.createEmployee);

// localhost:3000/employee/update PUT
EmployeeRouter.put("/update", EmployeeController.updateEmployee);

export default EmployeeRouter;