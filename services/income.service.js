import fs from "fs";
import Employee from "./employee.service.js";
import { dateNow } from "../utils/date.js";

function Income() {};

Income.prototype.create = function(data) {
	let incomes = [];
	try {
		incomes = JSON.parse(fs.readFileSync("./datasource/income/incomes.json"));
	} catch (error) {
		if (error.code !== "ENOENT") {
			throw error;
		}
	}
	
	this.bank = data.bank;
	this.balance = data.balance;

	let employee = {};
	try {
		employee = Employee.getByUID(data.employeeID);
	} catch(error) {
		throw error;
	}

	this.employeeID = employee.uid;

	this.createdAt = dateNow();

	incomes.push(this);

	fs.writeFileSync(
		"datasource/income/incomes.json",
		JSON.stringify(incomes)
	);

	return;
};

Income.all = () => {
	const data = fs.readFileSync("./datasource/income/incomes.json");
	const incomes = JSON.parse(data);

	for (const income of incomes) {
		income.accessAt = dateNow();
	}

	return incomes;
};

export default Income;