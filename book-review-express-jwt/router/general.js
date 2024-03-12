const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

async function getBooks(query) {
  if (!query) {
    // get all books
    return books;
  } else if (query.hasOwnProperty("isbn")) {
    let isbn = query["isbn"];
    if (isbn in books) {
      console.log("isbn exist!");
      console.log(JSON.stringify(books[isbn]));
      return books[isbn];
    } else {
      throw new Error("No book isbn exist!");
    }
  } else if (query.hasOwnProperty("author")) {
    let author = query["author"];
    bookList = [];
    for (const key in books) {
      if (books[key].author === author) {
        bookList.push(books[key]);
      }
    }
    if (bookList.length) return bookList;
    else {
      throw new Error("No book with matching author!");
    }
  } else if (query.hasOwnProperty("title")) {
    let title = query["title"];
    bookList = [];

    for (const key in books) {
      if (books[key].title === title) {
        bookList.push(books[key]);
      }
    }

    if (bookList.length) return bookList;
    else throw new Error("No title found!");
  } else if (query.hasOwnProperty("review")) {
    let isbn = query["review"];
    if (!(isbn in books)) {
      throw new Error("No isbn exist!");
    }
    reviews = books[isbn].reviews;
    if (reviews.length) {
      return books[isbn].reviews;
    } else throw new Error("Empty reviews!");
  }
}

public_users.post("/register", (req, res) => {
  //Write your code here
  let username = req.query.username;
  let password = req.query.password;

  if (username && password) {
    if (!isValid(username)) {
      return res.status(409).json({
        message: "Duplicate username exists, please use choose another one.",
      });
    } else {
      users.push({ username: username, password: password });
      return res.status(200).json({ message: "Registration Success!" });
    }
  } else {
    return res.status(404).json({ message: "Invalid username/password!" });
  }
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    ret = await getBooks(null);
    return res.status(200).json({ message: ret });
  } catch (err) {
    return res.status(404).json({ message: err.toString() });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  console.log(`isbn request, req isbn: ${isbn}`);
  try {
    let ret = await getBooks({ isbn: isbn });
    return res.status(200).json({ message: ret });
  } catch (err) {
    console.log("Error!");
    return res.status(404).json({ message: err.toString() });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  //Write your code here
  let author = req.params.author;
  console.log(`Author param value:${author}`);
  try {
    let ret = await getBooks({ author: author });
    return res.status(200).json({ message: ret });
  } catch (err) {
    return res.status(404).json({ message: err.toString() });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  let title = req.params.title;
  console.log(`Title param value:${title}`);

  try {
    let ret = await getBooks({ title: title });
    return res.status(200).json({ message: ret });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  console.log(`isbn request, req isbn: ${isbn}`);
  if (isbn in books) {
    console.log("isbn exist!");
    console.log(JSON.stringify(books[isbn]));

    try {
      let ret = await getBooks({ review: isbn });
      return res.status(200).json({ message: ret });
    } catch (err) {
      return res.status(404).json({ message: err.toString() });
    }
  }
});

module.exports.general = public_users;
