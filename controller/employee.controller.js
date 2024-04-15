import Employee from "../services/employee.service.js";

class EmployeeController {
	static allEmployees(req, res, next) {
		const employees = Employee.all();
		return res.status(200).json(employees);
	};

	static getEmployeeByUID(req, res, next) {
		const employee = Employee.getByUID(req.params.uid);

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
		if (!data.name || !data.email || !data.password || !data.nip) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		const employee = new Employee();
		employee.create(data);

		// omit the password
		employee.password = "";

		return res.status(201).json({
			msg: "success add employee",
			user: employee
		});
	}
}

export default EmployeeController;