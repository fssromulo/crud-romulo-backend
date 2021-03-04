const MainModel = require("../models/mainModel");
const PersonQuery = require("../models/querys/PersonQuery");
const bcrypt = require("bcryptjs");

const PersonService = {
	async authPerson(email, password) {
		const objQuery = {
			ds_query: PersonQuery.findPersonByEmailToAuth,
			objFields: {},
			arrWhereConditions: [email],
		};

		const user = await MainModel.findAll(objQuery);

		if (!user || user.length === 0) {
			return { error: true, msg: "Person not found" };
		}

		if (!(await bcrypt.compare(password, user[0].password))) {
			return { error: true, msg: "Wrong password" };
		}

		return { error: false, usuario: user[0] };
	},

	async getAllPersons(namePerson) {
		try {
			let ds_query = PersonQuery.findPersons;
			let arrWhereConditions = [];
			if (namePerson.length > 0) {
				arrWhereConditions = [`%${namePerson}%`];
				ds_query = PersonQuery.findPersonsByName;
			}

			const objQuery = {
				ds_query,
				objFields: {},
				arrWhereConditions,
			};

			return await MainModel.findAll(objQuery);
		} catch (error) {
			const msg_error = `Error to load persons, ${error}`;
			return res.status(500).json({ msg: msg_error });
		}
	},
	async getPersonById(idPerson) {
		try {
			const objQuery = {
				ds_query: PersonQuery.findPersonsById,
				objFields: {},
				arrWhereConditions: [idPerson],
			};

			return await MainModel.findAll(objQuery);
		} catch (error) {
			const msg_error = `Error to load persons by ID = ${idPerson}, ${error}`;
			return res.status(500).json({ msg: msg_error });
		}
	},

	async getHashPassword(password) {
		try {
			return await bcrypt.hash(password, 8);
		} catch (error) {
			console.log("Cannot generate password hash", error);
			return password;
		}
	},

	async insertPerson(objPersonToInsert) {
		objPersonToInsert.password = await bcrypt.hash(objPersonToInsert.password, 8);

		return await MainModel.insert(
			{
				ds_query: PersonQuery.insertPerson,
				arrFieldsToInsert: objPersonToInsert,
			},
			false
		);
	},

	async updatePerson(objPersonToInsert, idPerson) {
		return await MainModel.update(
			{
				ds_query: PersonQuery.updatePerson,
				arrFieldsToUpdate: objPersonToInsert,
				arrConditions: { id: idPerson },
			},
			false
		);
	},

	async deletePerson(idPerson) {
		return await MainModel.delete(
			{
				ds_query: PersonQuery.deletePerson,
				arrWhereConditions: [idPerson],
			},
			false
		);
	},
};

module.exports = PersonService;
