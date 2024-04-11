import crypto from "crypto";
import fs from "fs";
import { dateNow } from "../utils/date.js";
import { nanoid } from "nanoid";
import Job from "../services/job.service.js";

class jobController{

    static CreateJob(req,res,next){
        const job = req.body;
        if(!job.name || !job.wage || !job.totalWorkingHours){
            return res.status(500).json({msg:"Missing Required Fields!"});
        } 
        const jobs = new Job();
		jobs.create(job);

    }
    static AllJob(req,res,next){
        const response = Job.all();
		return res.status(200).json(response)
    }
}

export default jobController;