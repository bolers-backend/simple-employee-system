import express from "express";
import jobController from "../controller/job.controller.js";

const JobRouter = express.Router();


JobRouter.get("/",jobController.AllJob);

JobRouter.post("/", jobController.CreateJob);

export default JobRouter;