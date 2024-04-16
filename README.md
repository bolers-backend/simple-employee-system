# Simple Employee System

Simple Employee System with Express JS


## Entity

- `Employee`
Employee has one Job and many incomes. Attributes are `uid`, `name`, `nip`, `email`, `password`, `job`, `income`, `totalIncome`

- `Job`
Job attributes are `uid`, `name`, `wage`, `totalWorkingHours`.

- `Income`
Income attributes are `bank`, `balance`, `employeeID`.


## TODO

CREATE:
- Create new Employee
- Create new Job
- Create new Income

READ:
- Read existing Employee

UPDATE:
- Update Employee data

DELETE:
- Delete existing Employee


## Endpoint
- /employee
	- `GET` /employee/get/:uid

		Retrieve existing employee data.

	- `GET` /employee/all

		Retrieve all existing employee data.

	- `POST` /employee/create

		Create new employee data.

		payload: {
			"name": <String><required>,
			"email": <String><required>,
			"password" : <String><required>,
			"nip": <Number><required>,
			"jobUid": <String><required>
		}

	- `PUT` /employee/update

		Update existing employee data.

		payload: {
			"uid": <String><required>,
			"password" : <String><required>,
			"name": <String><optional>,
			"email": <String><optional>,
			"nip": <Number><optional>,
			"jobUid": <String><optional>
		}

- /income
	- `GET` /income/all

		Retrieve all existing income data.

	- `POST` /income/create

		Create new income data according to employee ID.

		payload: {
			"bank": <String><required>,
			"balance": <Number><required>,
			"employeeID": <String><required>
		}

- /job
	- `GET` /job/all

		Retrieve all existing job data.

	- `POST` /employee/create

		Create new job data.

		payload: {
			"name": <String><required>,
			"wage": <Number><required>,
			"totalWorkingHours": <Number><required>
		}

## Author
- Nopal
- Ari
- Hendra