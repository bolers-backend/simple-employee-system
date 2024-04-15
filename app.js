import express from "express";
import http from "http";
import EmployeeRouter from "./routes/employee.route.js";
import JobRouter from "./routes/job.route.js";
import IncomeRouter from "./routes/income.route.js";

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

// TODO: create this bellow
app.use("/employee", EmployeeRouter);
app.use("/job", JobRouter);
app.use("/income", IncomeRouter);


// Testing connection
app.get("/ping", (req, res, next) => {
	return res.status(200).json({ping: "pong"});
});

httpServer.listen(3000, () => {
	console.log("server start...");
});