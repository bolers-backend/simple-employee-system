import express from "express";
import incomeController from "../controller/income.controller.js";

const IncomeRouter = express.Router();

// localhost:3000/employee/get/uid_nya GET


// incomeRouter.get("/get/:uid", incomeController.getincomeByUID); dopmaopdj

// localhost:3000/employee/all GET
IncomeRouter.get("/all", incomeController.allIncome);

// localhost:3000/employee/create POST
IncomeRouter.post("/create", incomeController.createIncome);

export default IncomeRouter;