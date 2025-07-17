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

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.users = users;
