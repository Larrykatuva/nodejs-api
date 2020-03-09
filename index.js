const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flask1"
});

mysqlConnection.connect(err => {
  if (!err) console.log("BD connection Success");
  else
    console.log(
      "DB connection failed! \n Error: " + JSON.stringify(err, undefined, 2)
    );
});

//get all users
app.get("/users", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err)
      res.json({
        error: "false",
        data: rows
      });
    else console.log(err);
  });
});

//get single user
app.get("/user/:id", (req, res) => {
  var id = req.params.id;
  mysqlConnection.query(
    "SELECT * FROM users WHERE id = ?",
    id,
    (err, row, fields) => {
      if (!err)
        res.json({
          error: "flase",
          data: row
        });
      else console.log(err);
    }
  );
});

//add a new user
app.get("/adduser", (req, res) => {
  var data = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  var sql = "INSERT INTO users SET ?";
  mysqlConnection.query(sql, data, (err, row, fields) => {
    if (!err)
      res.json({
        error: "flase",
        message: {
          reponse: "data added",
          user_id: data.id
        }
      });
    else console.log(err);
  });
});

//deleting user
app.get("/user/delete/:id", (req, res) => {
  var id = req.params.id;
  mysqlConnection.query(
    "DELETE FROM users WHERE id = ?",
    id,
    (err, row, fields) => {
      if (!err)
        res.json({
          error: "flase",
          message: "user deleted"
        });
      else console.log(err);
    }
  );
});

//updating users
app.get("/user/updateuser/:id", (req, res) => {
  var data = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  var sql =
    "UPDATE users SET id = '" +
    data.id +
    "', name = '" +
    data.name +
    "',email = '" +
    data.email +
    "',pnone= '" +
    data.email +
    "' WHERE id='" +
    data.id +
    "'";
  mysqlConnection.query(sql, data, data.id, (err, row, fields) => {
    if (!err)
      res.json({
        error: "flase",
        message: {
          reponse: "data updated"
        }
      });
    else console.log(err);
  });
});

app.listen(3000, () => console.log("Express server is running at port:  3000"));
