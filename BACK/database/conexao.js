require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar:", erro);
    } else {
        console.log("Banco conectado!");
    }
});

module.exports = connection;