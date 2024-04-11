import crypto from "crypto";
import fs from "fs";
import { dateNow } from "../utils/date.js";
import { nanoid } from "nanoid";

class jobController{
    static AllJob(req,res,next){

    }

    static CreateJob(req,res,next){
        const job = req.body;
        if(!job.name || !job.wage || !job.totalWorkingHours){
            return res.status(500).json({msg:"Missing Required Fields!"});
        } else{
            job.createdAt = dateNow();
            job.id = nanoid(10);

            fs.writeFileSync(
                "datasource/job/" + job.id + ".json",
                JSON.stringify(job)
            )

            return res.status(200).json({msg: "job has been created!", job: job})
        }
    }
    static AllJob(req,res,next){
        const response = [];

		const filenames = fs.readdirSync("datasource/job/");
		for (const file of filenames) {
			const data = fs.readFileSync("./datasource/job/"+ file);

			const user = JSON.parse(data);
			user.accessAt = dateNow();

			response.push(user);
		}

		return res.status(200).json(response)
    }
}

export default jobController;