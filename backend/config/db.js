import mysql from "mysql2";
 const db = mysql.createConnection({
    user :"root",
    password : "Sidhu@022",
    host : "localhost",
    database : "ems_db"
});
export default db;