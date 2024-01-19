var express = require("express");
var router = express.Router();
var utils = require("../lib/base/utils");
var DAL = require("../lib/dal");
const { database } = require("../config");

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.post("/register", function (req, res) {
  try {
    console.log(req.body.userName);
    var user;
    if (req.body.userName) {
      DAL.db
        .collection("users")
        .find({
          userName: req.body.userName,
        })
        .toArray(function (err, users) {
          if (!users || users.length === 0) {
            user = {
              displayName: req.body.userName,
              userName: req.body.userName,
              guid: utils.guid(),
              chips: 2500000,
            };
            DAL.db.collection("users").insert(user);
          } else {
            user = users[0];
          }
          res.status(201).json({
            status: "success",
            data: user,
          });
        });
    } else {
      res.json({
        status: "failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.post("/get", function (req, res) {
  try {
    var user;
    if (req.body.userName) {
      DAL.db.users
        .find({
          userName: req.body.userName,
        })
        .toArray(function (err, users) {
          if (!users || users.length === 0) {
            res.json({
              status: "failed",
            });
          } else {
            user = users[0];
          }
          res.json({
            status: "success",
            data: user,
          });
        });
    } else {
      res.json({
        status: "failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

module.exports = router;
