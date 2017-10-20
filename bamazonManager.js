var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  inStock();
});

function moreStock() {
  console.log("Inserting new product.\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      item: "Strawberries",
      dept: "Food",
      price: 3.49,
      stock: 31
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
}

function updateProduct() {
  console.log("Updating selection\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock: 30
      },
      {
        item: "Strawberries"
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call outOfStock AFTER the UPDATE completes
      outOfStock();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
}