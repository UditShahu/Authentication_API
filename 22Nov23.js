const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname,"goodreads.db");

let db = null;

const initializeServerAndDb = async(req,res)=>{
    try {
        db= await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        app.listen(3005,()=>{
            console.log("server started")
        });
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
}

initializeServerAndDb();

app.get("/books",async(req, res)=>{
    const getBooksQuery = `SELECT * FROM book ORDER BY book_id;`;
    const bookArray = await db.all(getBooksQuery);
    res.send(bookArray);
})

app.get("/authors",async(req,res)=>{
    const getAuthorQuery = `SELECT * FROM  author ORDER BY author_id;`;
    const authorArray = await db.all(getAuthorQuery);
    res.send(authorArray);
})

//post book API
app.post("/books/", async(req,res)=>{
    const bookDetails = req.body;
    const {
        title,
        authorId,
        rating,
        ratingCount,
        reviewCount,
        description,
        pages,
        dateOfPublication,
        editionLanguage,
        price,
        onlineStores,
    } = bookDetails;
    const addBookQuery = `
        INSERT INTO
        book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
        VALUES
        (
            '${title}',
            ${authorId},
            ${rating},
            ${ratingCount},
            ${reviewCount},
            '${description}',
            ${pages},
            '${dateOfPublication}',
            '${editionLanguage}',
            ${price},
            '${onlineStores}'
        );`;
    const dbResponse = await db.run(addBookQuery);
    res.send("Book Added Successfully");
})

//PUT book API
app.put("/books/:bookId/", async(req,res)=>{
    const {bookId} = req.params;
    const bookDetails = req.body;
    const {
        title,
        authorId,
        rating,
        ratingCount,
        reviewCount,
        description,
        pages,
        dateOfPublication,
        editionLanguage,
        price,
        onlineStores,
    } = bookDetails;

    const updateBookQuery = `
        UPDATE book
        SET
            title='${title}',
            author_id=${authorId},
            rating=${rating},
            rating_count=${ratingCount},
            review_count=${reviewCount},
            description='${description}',
            pages=${pages},
            date_of_publication='${dateOfPublication}',
            edition_language='${editionLanguage}',
            price= ${price},
            online_stores='${onlineStores}'
        WHERE
            book_id = ${bookId};`;
    const dbResponse = await db.run(updateBookQuery);
    res.send("Book Updated Succesfully");
})

//DELETE books API
app.delete("/books/:bookId/", async(req,res)=>{
    const {bookId} = req.params;
    const deleteBookQuery = `
    DELETE FROM
        book
    WHERE
        book_id = ${bookId};`;
    const dbResponse = await db.run(deleteBookQuery);
    res.send("Books Deleted Successfully");
})

app.get("/books/:bookId/",async(req,res)=>{
    const {bookId} = req.params;
    const getAuthorQuery = `SELECT * FROM book WHERE book_id = ${bookId};`;
    const booksArray = await db.all(getAuthorQuery);
    res.send(booksArray);
})