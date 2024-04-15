import Income from "../services/income.service.js";

class incomeController {
	static allIncome(req, res, next) {
		const incomee = Income.all();
		return res.status(200).json(incomee);
	};

	static createIncome(req, res, next) {
		const income = req.body;
		if (!income.name || !income.bank || !income.balance || !income.employeeID) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		const incomes = new Income();
		incomes.create(income);

			return res.status(200).json(incomes);
	}
}

export default incomeController;