import mysql from "mysql";

const mysqlDB = mysql.createPool({
  connectionLimit: 30,
  host: "127.0.0.1",
  user: "root",
  password: "Lefirst@2020",
  database: "todo_list",
});

mysqlDB.getConnection((err: any, connection: any) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    } else if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has too many connections.");
    } else if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused.");
    } else console.error("Impossible de se connecter à la base");
  } else {
    console.info("Sucessfully connected to the mySQL database!");
  }

  if (connection) connection.release();
  return;
});

module.exports = mysqlDB;
