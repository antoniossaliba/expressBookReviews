const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const authenticatedUser = (username, password) => {

  for (const user of users) {

    if (user.username === username && user.password === password) {

      return true;

    }

  }

  return false;

}

//only registered users can login
regd_users.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {

    if (authenticatedUser(username, password)) {

      const accessToken = jwt.sign({

        data: password

      }, 'access', { expiresIn: 60 });

      req.session.authorization = {

        accessToken, username

      };

      return res.status(200).json({ message: "User logged in" });

    } else {

      return res.status(404).json({ message: "user not authenticated" });

    }

  } else {

    res.status(404).json({ message: "Check validity of the username and password" });

  }

});

regd_users.put("/add/:review", (req, res) => {

  const review = req.params.review;
  const username = req.session.authorization["username"];
  const isbn = req.body.isbn;

  if (books[isbn]) {

    books[isbn]["reviews"][username] = review;

    res.send(JSON.stringify(books[isbn], null, 5));

  } else {

    res.status(404).json({ message: "ISBN number not valid!" });

  }

  return;

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.users = users;
