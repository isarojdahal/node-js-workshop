import mysql from "mysql2/promise";
export default await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "iamsohappy",
  database: "testdb",
});
