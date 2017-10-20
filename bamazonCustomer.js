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

function inStock() {
  console.log("Selecting all products...\n");
  connection.query("SELECT id, item, price FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement

    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: "+res[i].id+", Product: "+res[i].item+", Price: "+res[i].price+"\n");
    }
    connection.end();
  });
}