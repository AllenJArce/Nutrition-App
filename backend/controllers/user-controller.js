const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");
// const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //10 is how long the hash number is
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
    });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          messsage: "Auth failed!"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" } //how long the token is valid, enter a string for the duration
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600, //property for how long the token expires, 3600 seconds (1hr)
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        messsage: "Invalid authentication credentials!"
      });
    });
};

exports.editUser = (req, res, next) => {
  const user = new User({
    _id: req.body.id,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone
  });
  User.updateOne({ _id: req.params.id }, user)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "User Updated!" });
      } else {
        res.status(401).json({ message: "User Not Updated!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not updated user!"
      });
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not fetch user!"
      });
    });
};
