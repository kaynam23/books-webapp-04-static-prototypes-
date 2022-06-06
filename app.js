//set up the server
const express = require( "express" );
const logger = require("morgan");
const db = require('./db/db_connection');
const app = express();
const port = process.env.PORT;

// Configure Express to use EJS
app.set( "views", __dirname + "/views");
app.set( "view engine", "ejs");

//configure express to parse  URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({extended : false}));

//defining middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));


// define a route for the default home page
app.get( "/", ( req, res ) => {
    //console.log("GET /");
    res.render( 'welcome');
} );

const read_inventory_all_sql = `
    SELECT
        id, title, author, description
    FROM
        book
`

// define a route for the stuff inventory page
app.get( "/inventory", ( req, res ) => {
    db.execute(read_inventory_all_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else{
            res.render('inventory', { inventory : results });
        }
    });
});

const read_inventory_book_sql = `
    SELECT
        id, title, author, description, rating
    FROM
        book
    WHERE
        id = ?
`
// define a route for the item detail page
app.get( "/inventory/book/:id", ( req, res, next ) => {
    //console.log("GET /stuff/item");
    //res.sendFile( __dirname + "/views/book.html" );} );
    db.execute(read_inventory_book_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error);
        else if (results.length ==0)
            res.status(404).send('No item found with id = "${req.params.id}"');
        else {
            let data = results[0];
            res.render('book', data);
        }
    });
});

const delete_book_sql = `
    DELETE 
    FROM
        book
    WHERE
        id = ?
`

app.get("/inventory/book/:id/delete", (req, res) => {
    db.execute(delete_book_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error);
        else{
            res.redirect("/inventory");
        }
    })
});

const create_book_sql = `
    INSERT INTO book
        (title, author)
    VALUES
        (?, ?)
    `

app.post("/inventory", (req,res) => {
    db.execute(create_book_sql, [req.body.title, req.body.author], (error, results) => {
        if (error)
            res.status(500).send(error);
        else {
            // res.redirect('/inventory');
            res.redirect(`/inventory/book/${results.insertId}`);
        }
    })
})

const update_book_sql = `
UPDATE 
    book
SET
    title = ?,
    author = ?,
    description = ?,
    rating = ?
WHERE
    id = ?
`

app.post("/inventory/book/:id", (req, res) => {
    db.execute(update_book_sql, [req.body.title, req.body.author, req.body.description, req.body.rating, req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error);
        else{
            res.redirect(`/inventory/book/${req.params.id}`);
        }
    })
})

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );