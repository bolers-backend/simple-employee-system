import crypto from "crypto";
import fs from "fs";
import { dateNow } from "../utils/date.js";

class EmployeeController {
	static allEmployee(req, res, next) {
		const response = [];

		const filenames = fs.readdirSync("datasource/employee/");
		for (const file of filenames) {
			const data = fs.readFileSync("./datasource/employee/"+ file);

			const user = JSON.parse(data);
			user.accessAt = dateNow();

			response.push(user);
		}

		return res.status(200).json(response)
	};

	static createEmployee(req, res, next) {
		const user = req.body;
		if (!user.name || !user.email || !user.password || !user.nim) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		user.createdAt = dateNow();
		user.id = crypto.randomUUID();

		fs.writeFileSync(
			"datasource/employee/" + user.id + ".json",
			JSON.stringify(user)
		);

		return res.status(201).json({
			msg: "success add user",
			user: user
		});
	}
}

export default EmployeeController;