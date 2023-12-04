const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

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

app.get("/books:book_id",async(req, res)=>{
    const {bookId} = req.params
    const getBooksQuery = `SELECT * FROM book where book_id=${bookId};`;
    const bookArray = await db.all(getBooksQuery);
    res.send(bookArray);
})

app.get("/authors",async(req,res)=>{
    const getAuthorQuery = `SELECT * FROM  author ORDER BY author_id;`;
    const authorArray = await db.all(getAuthorQuery);
    res.send(authorArray);
})