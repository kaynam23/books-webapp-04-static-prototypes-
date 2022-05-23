const db = require("./db_connection");

// Add query request
db.execute('Select 1 + 1 AS solution',
    (error, results) => {
        if (error)
            throw error;
        console.log(results);
    }
);

db.end();
