import express from "express";
import jobController from "../controller/job.controller.js";

const JobRouter = express.Router();

// localhost:3000/job/all GET
JobRouter.get("/all",jobController.AllJob);

// localhost:3000/job/create POST
JobRouter.post("/create", jobController.CreateJob);

export default JobRouter;