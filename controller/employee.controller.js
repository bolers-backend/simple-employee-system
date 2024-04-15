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

			return res.status(500).json({msg: "Server Error!"});
		}

		const employeeDisplayed = {
			name: employee.name,
			nip: employee.nip,
			email: employee.email,
			job: employee.job,
		};

		return res.status(200).json(employeeDisplayed);
	};

	static createEmployee(req, res, next) {
		const data = req.body;
		if (!data.name || !data.email || !data.password || !data.nip || !data.jobUid) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		const employee = new Employee();
		try {
			employee.create(data);
		} catch(error) {
			if (error.message === "_uid_unknown_") {
				return res.status(400).json({msg: "ID Unknown!"});
			}

			return res.status(500).json({msg: "Server Error!"});
		}

		// omit the password
		employee.password = "";

		return res.status(201).json({
			msg: "success add employee",
			user: employee
		});
	};
};

export default EmployeeController;