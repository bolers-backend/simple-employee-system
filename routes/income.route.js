import express from "express";
import incomeController from "../controller/income.controller.js";

const IncomeRouter = express.Router();

// localhost:3000/income/all GET
IncomeRouter.get("/all", incomeController.allIncomes);

// localhost:3000/income/create POST
IncomeRouter.post("/create", incomeController.createIncome);

export default IncomeRouter;