const db = require("./db_connection");

const drop_book_table_sql = "DROP TABLE IF EXISTS `book`;"

db.execute(drop_book_table_sql);

const create_book_table_sql = `
    CREATE TABLE book (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(45) NOT NULL,
        author VARCHAR(45) NOT NULL,
        description VARCHAR(150) NULL,
        rating INT NULL,
        PRIMARY KEY (id));
`

db.execute(create_book_table_sql);

const insert_book_table_sql = `
    INSERT INTO book
        (title, author, description, rating)
    VALUES
        (?, ?, ?, ?)
`

db.execute(insert_book_table_sql, ['The Song of Achilles', 'Madeline Miller', 'Set during the Greek Heroic Age, it is an adaptation of Homer\'s Iliad as told from the perspective of Patroclus.', '8']);
db.execute(insert_book_table_sql, ['If We Were Villians', 'M.L. Rio', null, null]);
db.execute(insert_book_table_sql, ['1984', 'George Orwell', 'Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale written by English writer George Orwell.', '6']);
db.execute(insert_book_table_sql, ['The Priory of the Orange Tree', 'Samantha Shannon', null, null]);

const read_stuff_table_sql = "SELECT * FROM book";

db.execute(read_stuff_table_sql,
    (error, results) => {
        if (error)
            throw error;
        
        console.log("Table 'book' initialized with: ")
        console.log(results);
    }
);

db.end();

