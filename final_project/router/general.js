const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {

  res.send(JSON.stringify(books, null, 5));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {

  const isbn = req.params.isbn;

  if (books[isbn]) {

    res.send(JSON.stringify(books[isbn], null, 5));

  } else {

    res.status(404).json({ message: "ISBN not valid!" });

  }

});
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {

  const author = req.params.author;

  if (author) {

    for (const [key, value] of Object.entries(books)) {

      if (value.author === author) {

        res.send(JSON.stringify(value, null, 5));
        return;

      }

    }

    res.send(JSON.stringify({ message: `${author} not present` }, null, 5));
    return;

  } else {

    res.status(404).json({ message: "Author not provided!" })

  }

});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {

  const title = req.params.title;

  if (title) {

    for (const [key, value] of Object.entries(books)) {

      if (value.title === title) {

        res.send(JSON.stringify(value, null, 5));
        return;

      }

    }

    res.status(404).json({ message: `${title} not found!` });

  } else {

    res.status(404).json({ message: "Title not provided!" });

  }

});

//  Get book review
public_users.get('/review/:isbn', (req, res) => {

  const isbn = req.params.isbn;

  if (books[isbn]) {

    res.send(JSON.stringify(books[isbn].reviews, null, 5));

  } else {

    res.status(404).json({ message: "ISBN not valid" });

  }

});

module.exports.general = public_users;
