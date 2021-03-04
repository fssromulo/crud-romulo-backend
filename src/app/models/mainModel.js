const mysql = require("mysql2/promise");
const poolConnection = require("./../../db-config/database");

const MainModel = {
	async findAll(objQuery) {
		try {
			const { ds_query, arrWhereConditions } = objQuery;

			const sql = mysql.format(ds_query, arrWhereConditions);

			// query database
			const [rows] = await poolConnection.execute(sql);

			if (process.env.NODE_ENV === "development") {
				console.log("[Query log] ==>", sql.trim());
			}

			return rows;
		} catch (error) {
			const msg_error = `(Code error: 10000001) Error to make request to database. ${error}`;
			console.error(msg_error);
			return msg_error;
		}
	},

	async insert(objQuery, isMultiple) {
		if (isMultiple) {
			return await this.insertMultiple(objQuery);
		}
		return await this.insertSimple(objQuery);
	},

	/**
	 * This function execute a insert statement on Database.
	 * Insert the data one each time
	 * @param {*} objQuery
	 */
	async insertSimple(objQuery) {
		try {
			const { ds_query, arrFieldsToInsert } = objQuery;

			const sql = mysql.format(ds_query, arrFieldsToInsert);

			if (process.env.NODE_ENV === "development") {
				console.log("[Query log] ==>", sql.trim());
			}

			// query database
			const [objResultQuery] = await poolConnection.execute(sql);

			return objResultQuery;
		} catch (error) {
			const msg_error = `(Code error: 10000002) Error to make [Simple]INSERT INTO database. ${error}`;
			console.error(msg_error);
			return { msg_error, insertId: null };
		}
	},

	/**
	 * This function execute a insert statement on Database.
	 * Insert multiple data each time
	 *
	 * Para esse insert deve ser passado apenas os valores em um array.
	 * Não enviar um objeto com chave e valor. Enviar somente o os valores.
	 *
	 * @param {*} objQuery
	 */
	async insertMultiple(objQuery) {
		try {
			let { ds_query, arrFieldsToInsert } = objQuery;

			let multipleInsert = [];
			// Extraí apenas os valores para fazer o insert multiplo. Ignora as chves dos objetos
			for (const itens of arrFieldsToInsert) {
				multipleInsert.push(Object.values(itens));
			}

			// query database
			const [objResultQuery] = await poolConnection.query(ds_query, [multipleInsert]);

			return objResultQuery;
		} catch (error) {
			const msg_error = `(Code error: 10000003) Error to make [Multiple]INSERT INTO database. ${error}`;
			console.error(msg_error);
			return msg_error;
		}
	},

	/**
	 * This function get the field in the object/array and return
	 * the field with a pattern to escape on the sql condition
	 * @param {*} arrFields
	 */
	mapFieldsToUpdate(arrFields) {
		const columns = Object.getOwnPropertyNames(arrFields);
		return columns.map((column) => `${column} = ?`);
	},

	/**
	 *
	 *
	 * @param {*} objQuery
	 */
	async update(objQuery) {
		try {
			let { ds_query, arrFieldsToUpdate, arrConditions } = objQuery;

			let colums = this.mapFieldsToUpdate(arrFieldsToUpdate);
			let conditions = this.mapFieldsToUpdate(arrConditions);

			let values = Object.values(arrFieldsToUpdate);
			let valuesCondition = Object.values(arrConditions);
			values = values.concat(valuesCondition);

			ds_query = ds_query.replace("$$campos$$", colums.join(", "));

			// TO-DO: PENSAR NUMA LOGICA PARA FAZER O UPDATE RECEBER AS CONDIÇÕES COM AND/OR ETC....
			ds_query = ds_query.replace("$$condicoes$$", conditions.join("AND "));

			const sql = mysql.format(ds_query, values);

			if (process.env.NODE_ENV === "development") {
				console.log("[Query log] ==>", sql.trim());
			}

			// query database
			const [objResultQuery] = await poolConnection.execute(sql);

			return objResultQuery;
		} catch (error) {
			const msg_error = `(Code error: 10000004) Error to make UPDATE at database. ${error}`;
			console.error(msg_error);
			return { msg_error, insertId: null };
		}
	},

	/**
	 *
	 *
	 * @param {*} objQuery
	 */
	async delete(objQuery) {
		try {
			const { ds_query, arrWhereConditions } = objQuery;

			const sql = mysql.format(ds_query, arrWhereConditions);

			// query database
			const [rows] = await poolConnection.execute(sql);

			if (process.env.NODE_ENV === "development") {
				console.log("[Query log] ==>", sql.trim());
			}

			return rows;
		} catch (error) {
			const msg_error = `(Code error: 10000005) Error to delete data at the database. ${error}`;
			console.error(msg_error);
			return msg_error;
		}
	},
};

module.exports = MainModel;
