import fs from "fs";
import {nanoid} from "nanoid";
import { dateNow } from "../utils/date.js";

function Job() {};

Job.prototype.create = function(data) {
	this.name = data.name;
	this.wage = data.wage;
	this.totalWorkingHours = data.totalWorkingHours;

	this.createdAt = dateNow();
	this.uid = nanoid(10);

	fs.writeFileSync(
		"datasource/job/" + this.uid + ".json",
		JSON.stringify(this)
	);

	return;
};

Job.all = () => {
	const response = [];

	const filenames = fs.readdirSync("datasource/job/");
	for (const file of filenames) {
		const data = fs.readFileSync("./datasource/job/"+ file);

		const Job = JSON.parse(data);

		Job.accessAt = dateNow();

		response.push(Job);
	}

	return response;
};

Job.getByUID = (uid) => {
	const data = fs.readFileSync("./datasource/job/" + uid + ".json");

	const job = JSON.parse(data);
	job.accessAt = dateNow();

	return job;
};

export default Job;