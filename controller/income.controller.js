import Income from "../services/income.service.js";

class incomeController {
	static allIncomes(req, res, next) {
		const incomes = Income.all();
		return res.status(200).json(incomes);
	};

	static createIncome(req, res, next) {
		const data = req.body;
		if (!data.bank || !data.balance || !data.employeeID) {
			return res.status(400).json({msg: "Missing required fields!"});
		}

		const income = new Income();
		try {
			income.create(data)
		} catch(error) {
			if (error.message === "_uid_unknown_") {
				return res.status(400).json({msg: "ID Unknown!"});
			}
			console.log(error);

			return res.status(500).json({msg: "Server Error!"});
		}

		return res.status(201).json({
			msg: "success add income",
			user: income
		});
	}
}

export default incomeController;