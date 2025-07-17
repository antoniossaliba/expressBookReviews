const express = require('express');
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {

    const doesExist = (users, specificUsername) => {

      for (const user of users) {

        if (user.username === specificUsername) {

          return true;

        }

      }

      return false;

    }

    if (!doesExist(users, username)) {

      users.push({"username": username, "password": password});
      res.status(200).json({ message: "User registered successfully!" });

    } else {

      res.status(404).json({ message: "User already registered!" });

    }

  } else {

    res.status(404).json({ message: "Username or password not provided" });

  }

});

// Get the book list available in the shop
public_users.get('/', async (req, res) => {

  await res.send(JSON.stringify(books, null, 5));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {

  const isbn = req.params.isbn;

  if (books[isbn]) {

    await res.send(JSON.stringify(books[isbn], null, 5));

  } else {

    await res.status(404).json({ message: "ISBN not valid!" });

  }

});
  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {

  const author = req.params.author;

  if (author) {

    for (const [key, value] of Object.entries(books)) {

      if (value.author === author) {

        await res.send(JSON.stringify(value, null, 5));
        return;

      }

    }

    await res.send(JSON.stringify({ message: `${author} not present` }, null, 5));
    return;

  } else {

    await res.status(404).json({ message: "Author not provided!" })

  }

});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {

  const title = req.params.title;

  if (title) {

    for (const [key, value] of Object.entries(books)) {

      if (value.title === title) {

        await res.send(JSON.stringify(value, null, 5));
        return;

      }

    }

    await res.status(404).json({ message: `${title} not found!` });

  } else {

    await res.status(404).json({ message: "Title not provided!" });

  }

});

//  Get book review
public_users.get('/review/:isbn', async (req, res) => {

  const isbn = req.params.isbn;

  if (books[isbn]) {

    await res.send(JSON.stringify(books[isbn].reviews, null, 5));

  } else {

    await res.status(404).json({ message: "ISBN not valid" });

  }

});

module.exports.general = public_users;
