const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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
public_users.get("/", function (req, res) {
  return res.status(200).json({ message: books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  console.log(`isbn request, req isbn: ${isbn}`);
  if (isbn in books) {
    console.log("isbn exist!");
    console.log(JSON.stringify(books[isbn]));
    return res.status(200).json({ message: books[isbn] });
  }

  return res
    .status(404)
    .json({ message: "No book with the given ISBN found!" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  let author = req.params.author;
  console.log(`Author param value:${author}`);
  if (!author) {
    return res.status(404).json({ message: "No author information is given!" });
  }
  bookList = [];
  for (const key in books) {
    if (books[key].author === author) {
      bookList.push(books[key]);
    }
  }
  if (bookList.length) return res.status(200).json({ message: bookList });
  else return res.status(404).json({ message: "No book found!" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let title = req.params.title;
  console.log(`Title param value:${title}`);

  bookList = [];

  for (const key in books) {
    if (books[key].title === title) {
      bookList.push(books[key]);
    }
  }

  if (bookList.length) return res.status(200).json({ message: bookList });
  else return res.status(404).json({ message: "No book found!" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  console.log(`isbn request, req isbn: ${isbn}`);
  if (isbn in books) {
    console.log("isbn exist!");
    console.log(JSON.stringify(books[isbn]));
    reviews = books[isbn].reviews;
    if (reviews.length) {
      return res.status(200).json({ message: books[isbn].reviews });
    } else return res.status(404).json({ message: "Empty reviews!" });
  }
  return res
    .status(404)
    .json({ message: "No book with the given ISBN found!" });
});

module.exports.general = public_users;
