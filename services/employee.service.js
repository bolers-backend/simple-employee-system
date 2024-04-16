import crypto from "crypto";
import fs from "fs";
import Job from "./job.service.js";
import Income from "./income.service.js";
import { dateNow } from "../utils/date.js";

function Employee() {};

Employee.prototype.create = function(data) {
	this.name = data.name;
	this.nip = data.nip;
	this.email = data.email;
	this.password = data.password;

	let job = {};
	try {
		job = Job.getByUID(data.jobID);
	} catch(error) {
		throw error;
	}

	this.jobID = data.jobID
	this.job = {
		name: job.name,
		wage: job.wage,
		totalWorkingHours: job.totalWorkingHours,
	};

	this.createdAt = dateNow();
	this.uid = crypto.randomUUID();

	fs.writeFileSync(
		"datasource/employee/" + this.uid + ".json",
		JSON.stringify(this, null, 2)
	);

	return;
};

Employee.update = (newData) => {
	let employee = {};
	try {
		employee = JSON.parse(fs.readFileSync("./datasource/employee/" + newData.uid + ".json"));
	} catch(error) {
		if (error.code === "ENOENT") {
			throw new Error("_uid_unknown_");
		} else {
			throw error;
		}
	}

	if (employee.password !== newData.password) {
		throw new Error("_invalid_password_");
	}

	employee.name = newData.name || employee.name;
	employee.nip = newData.nip || employee.nip;
	employee.email = newData.email || employee.email;
	employee.jobID = newData.jobID || employee.jobID;

	let newJob = {};
	try {
		newJob = Job.getByUID(employee.jobID);
	} catch(error) {
		throw error;
	}

	employee.job = {
		name: newJob.name,
		wage: newJob.wage,
		totalWorkingHours: newJob.totalWorkingHours,
	};

	employee.updateAt = dateNow();

	fs.writeFileSync(
		"datasource/employee/" + employee.uid + ".json",
		JSON.stringify(employee, null, 2)
	);

	return employee;
}

Employee.delete = (data) => {
	let employee = {};
	try {
		employee = JSON.parse(fs.readFileSync("./datasource/employee/" + data.uid + ".json"));
	} catch(error) {
		if (error.code === "ENOENT") {
			throw new Error("_uid_unknown_");
		} else {
			throw error;
		}
	}

	if (employee.password !== data.password) {
		throw new Error("_invalid_password_");
	}

	try {
		fs.unlinkSync("./datasource/employee/" + employee.uid + ".json");
	} catch(error) {
		throw error;
	}

	console.log("Successfully deleted: ", "./datasource/employee/" + employee.uid + ".json");
	return;
}

Employee.getByUID = (uid) => {
	let employee = {};
	try {
		employee = JSON.parse(fs.readFileSync("./datasource/employee/" + uid + ".json"));
	} catch(error) {
		if (error.code === "ENOENT") {
			throw new Error("_uid_unknown_");
		} else {
			throw error;
		}
	}

	employee.income = [];
	employee.totalIncome = 0;
	for (const income of Income.all()) {
		if (income.employeeID === employee.uid) {
			employee.income.push(income);
			employee.totalIncome += income.balance;
		}
	}

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
