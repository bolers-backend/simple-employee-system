import crypto from "crypto";
import fs from "fs";
import { dateNow } from "../utils/date.js";

function Employee() {};

Employee.prototype.create = function(data) {
	this.name = data.name;
	this.nim = data.nim;
	this.email = data.email;
	this.password = data.password;

	this.createdAt = dateNow();
	this.uid = crypto.randomUUID();

	fs.writeFileSync(
		"datasource/" + this.uid + ".json",
		JSON.stringify(this)
	);

	return;
};

Employee.get = (uid) => {
	const data = fs.readFileSync("./datasource/" + uid + ".json");

	const employee = JSON.parse(data);
	employee.accessAt = dateNow();

	return employee;
};

Employee.all = () => {
	const employees = [];

	const filenames = fs.readdirSync("datasource");
	for (const file of filenames) {
		const data = fs.readFileSync("./datasource/"+ file);

		const employee = JSON.parse(data);

		// omit the password
		employee.password = "";
		
		employee.accessAt = dateNow();

		employees.push(employee);
	}

	return employees;
};

export default Employee;