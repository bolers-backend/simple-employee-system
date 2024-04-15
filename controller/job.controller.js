import Job from "../services/job.service.js";

class jobController{

    static AllJobs(req,res,next){
        const response = Job.all();
        return res.status(200).json(response);
    };

    static CreateJob(req,res,next){
        const data = req.body;
        if(!data.name || !data.wage || !data.totalWorkingHours){
            return res.status(500).json({msg: "Missing Required Fields!"});
        } 
        const job = new Job();
		job.create(data);

        return res.status(201).json({
            msg: "success add job",
            user: job
        });
    };
};

export default jobController;