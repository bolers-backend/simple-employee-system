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

Job.getByUID = (uid) => {
	let job = {};
	try {
		job = JSON.parse(fs.readFileSync("./datasource/job/" + uid + ".json"));
	} catch(error) {
		if (error.code === "ENOENT") {
			throw new Error("_uid_unknown_");
		} else {
			throw error;
		}
	}

	job.accessAt = dateNow();

	return job;
};

Job.all = () => {
	const jobs = [];

	const filenames = fs.readdirSync("datasource/job");
	for (const file of filenames) {
		const data = fs.readFileSync("./datasource/job/"+ file);

		const job = JSON.parse(data);

		job.accessAt = dateNow();

		jobs.push(job);
	}

	return jobs;
};

export default Job;