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
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement

    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: "+res[i].id+", Product: "+res[i].item+", Price: "+res[i].price+", Stock: "+res[i].stock+"\n");
    }
    start();
  });
}

function start() {
  inquirer
    .prompt({
      name: "option",
      type: "list",
      message: "Would you like to [SHOP] or [EXIT] the store?",
      choices: ["SHOP", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.option.toUpperCase() === "SHOP") {
        shOptions();
      }
      else {
        endProgram();
      }
    });
}

function shOptions() {
  // query the database for all items in store
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(String(res[i].item));
            }
    // prompt user for what they want to buy
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: choiceArray,
          message: "What would you like to purchase?"
        },
        {
          name: "num",
          type: "input",
          message: "How much would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem = {};
        for (var i = 0; i < res.length; i++) {
          if (res[i].item === answer.choice) {
            chosenItem = res[i];
          }
        }
        var totalPrice = (chosenItem.price * answer.num);
        var stockOut = chosenItem.stock - parseInt(answer.num);
        // if there are stock remaining,
        if (chosenItem.stock > 0 && stockOut >= 0) {
          // sufficient stock, update DB to reflect purchase
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock: stockOut
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Item bought successfully!\n");
              console.log("Total cost: $"+totalPrice+"\n");
              console.log(stockOut+" "+chosenItem.item+" remaining.");
              start();
            }
          );
        }
        else {
          console.log("Not enough product, try again.");
          start();
        }
      });
  });
}


function endProgram(){
  connection.end();
}