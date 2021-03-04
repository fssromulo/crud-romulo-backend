const mysql = require("mysql2");

require("dotenv").config({
	path: process.env.NODE_ENV != "development" ? ".env" : "",
});

const user = process.env.DB_USER;
if (!user) {
	throw new Error("ERRO - FALTAM AS CONFIGURAÇÕES DE ACESSO AO BANCO DE DADOS");
}

const pool = mysql.createPool({
	user,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE_NAME,
	host: process.env.DB_HOST,
	waitForConnections: true,
	connectionLimit: 35,
	queueLimit: 0,
});

module.exports = pool.promise();
