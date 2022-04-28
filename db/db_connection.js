const mysql = require('mysql2');

const dbConfig = {
    host: "soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "kaynam23",
    password: "tk7gb88byzkm",
    database: "webapp2122t3_kaynam23",
    connectTimeout: 10000
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;