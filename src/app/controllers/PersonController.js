const PersonService = require("../services/PersonService");
const jwt = require("jsonwebtoken");

const PersonController = {
	async authUser(req, res) {
		try {
			const { email, password } = req.body;
			const user = await PersonService.authPerson(email, password);
			if (user.error) {
				return res.status(400).send({ error: user.msg });
			}

			delete user.password;
			return res.send({
				user: user,
				token: jwt.sign({ id: user.id }, process.env.APP_SECRET),
				expiresIn: parseInt(process.env.EXPIRES_IN),
			});
		} catch (error) {
			console.log("Error to auth person", error);
		}
	},

	getAllPersons: async (req, res) => {
		try {
			const name = req.query.name || "";
			const objAllPerson = await PersonService.getAllPersons(name);

			return res.status(200).json(objAllPerson);
		} catch (error) {
			console.log("Error to load all persons[PersonController]", error);
			return res.status(500).json({ error: "Error to load all persons[PersonController]" });
		}
	},

	getPersonById: async (req, res) => {
		try {
			let { id: idPerson } = req.params;

			if (!idPerson) {
				return res.status(400).json({ error: "You need to pass the person id." });
			}

			const objPersonById = await PersonService.getPersonById(idPerson);
			return res.status(200).json(objPersonById);
		} catch (error) {
			console.log("Error to load person by ID [PersonController]", error);
			return res.status(500).json({ error: "Error to load person by ID [PersonController]" });
		}
	},

	deletePerson: async (req, res) => {
		try {
			let { id: idPerson } = req.params;
			if (!idPerson) {
				return res.status(400).json({ error: "You need to pass the person id." });
			}
			const objPersonById = await PersonService.deletePerson(idPerson);
			return res.status(200).json(objPersonById);
		} catch (error) {
			console.log("Error to delete person by ID [PersonController]", error);
			return res.status(500).json({ error: "Error to delete person by ID [PersonController]" });
		}
	},

	async insertPerson(req, res) {
		try {
			const objPersonToSave = req.body || null;
			if (!objPersonToSave) {
				return res.status(400).json({ error: "You need to pass the a body person." });
			}

			const idPerson = objPersonToSave.id || null;
			const hasIdPerson = idPerson || false;
			let objPerson = {};

			if (!hasIdPerson) {
				objPerson = await PersonService.insertPerson(objPersonToSave);
			} else {
				objPerson = await PersonService.updatePerson(objPersonToSave, idPerson);
			}

			if (objPerson.hasOwnProperty("msg_error")) {
				return res.status(500).json({ error: objPerson.msg_error });
			}

			return res.json(objPerson);
		} catch (error) {
			console.log("Error to save/update person by ID [PersonController]", error);
			return res.status(500).json({ error: "Error to save/update person by ID [PersonController]" });
		}
	},
};

module.exports = PersonController;
