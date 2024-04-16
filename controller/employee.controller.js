import Employee from "../services/employee.service.js";

class EmployeeController {
	static allEmployees(req, res, next) {
		const employees = Employee.all();
		return res.status(200).json(employees);
	};

	static getEmployeeByUID(req, res, next) {
		let employee = {};
		try {
			employee = Employee.getByUID(req.params.uid);
		} catch(error) {
			if (error.message === "_uid_unknown_") {
				return res.status(400).json({msg: "ID Unknown!"});
			}

			console.error(error);
			return res.status(500).json({msg: "Server Error!"});
		}

		const incomeDisplayed = [];
		for (const income of employee.income) {
			incomeDisplayed.push({
				bank: income.bank,
				balance: income.balance,
			});
		}

		const employeeDisplayed = {
			name: employee.name,
			nip: employee.nip,
			email: employee.email,
			job: employee.job,
			income: incomeDisplayed,
			totalIncome: employee.totalIncome,
			accessAt: employee.accessAt,
		};

		return res.status(200).json(employeeDisplayed);
	};

	static createEmployee(req, res, next) {
		const data = req.body;
		if (!data.name || !data.email || !data.password || !data.nip || !data.jobID) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		const employee = new Employee();
		try {
			employee.create(data);
		} catch(error) {
			if (error.message === "_uid_unknown_") {
				return res.status(400).json({msg: "ID Unknown!"});
			}

			console.error(error);
			return res.status(500).json({msg: "Server Error!"});
		}

		// omit the password
		employee.password = "";

		return res.status(201).json({
			msg: "success add employee",
			user: employee
		});
	};

	static updateEmployee(req, res, next) {
		const data = req.body;
		if (!data.password || !data.uid) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		let employee = {};
		try {
			employee = Employee.update(data);
		} catch(error) {
			if (error.message === "_uid_unknown_") {
				return res.status(400).json({msg: "ID Unknown!"});
			} else if (error.message === "_invalid_password_") {
				return res.status(401).json({msg: "Unauthorized!"});
			}

			console.error(error);
			return res.status(500).json({msg: "Server Error!"});
		}

		// omit the password
		employee.password = "";

		return res.status(200).json({
			msg: "success update employee",
			user: employee
		});
	};

	static deleteEmployee(req, res, next) {
		const data = req.body;
		if (!data.uid || !data.password) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		try {
			Employee.delete(data);
		} catch(error) {
			if (error.message === "_uid_unknown_") {
				return res.status(400).json({msg: "ID Unknown!"});
			} else if (error.message === "_invalid_password_") {
				return res.status(401).json({msg: "Unauthorized!"});
			}
			
			console.error(error);
			return res.status(500).json({msg: "Server Error!"});
		}

		return res.status(204).json({
			msg: "success delete employee"
		});
	};
};

export default EmployeeController;