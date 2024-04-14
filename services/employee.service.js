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
		"datasource/employee/" + this.uid + ".json",
		JSON.stringify(this)
	);

	return;
};

Employee.getByUID = (uid) => {
	const data = fs.readFileSync("./datasource/employee/" + uid + ".json");

	const employee = JSON.parse(data);
	employee.accessAt = dateNow();

	return employee;
};

Employee.all = () => {
	const employees = [];

	const filenames = fs.readdirSync("datasource/employee");
	for (const file of filenames) {
		const data = fs.readFileSync("./datasource/employee/"+ file);

		const employee = JSON.parse(data);

		// omit the password
		employee.password = "";
		
		employee.accessAt = dateNow();

		employees.push(employee);
	}

	return employees;
};

export default Employee;
