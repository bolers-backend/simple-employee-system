import crypto from "crypto";
import fs from "fs";
import { dateNow } from "../utils/date.js";
import { response } from "express";

function Income() {};

Income.prototype.create = function(data) {
	this.name = data.name;
	this.bank = data.bank;
	this.balance = data.balance;
	this.employeeID = data.employeeId;

	this.createdAt = dateNow();
	this.uid = crypto.randomUUID();

	fs.writeFileSync(
		"datasource/" + this.uid + ".json",
		JSON.stringify(this)
	);

	return;
};

Income.all = () => {
	const income = [];

	const filenames = fs.readdirSync("datasource");
	for (const file of filenames) {
		const data = fs.readFileSync("./datasource/"+ file);

		const income = JSON.parse(data);

		Income.accessAt = dateNow();

		response.push(income);
	}

	return income;
};

export default Income;