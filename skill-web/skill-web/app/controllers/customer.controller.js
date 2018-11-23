// Fetch all Customers
var customers;
var requireds;
var result;

function getCustomers(urlCustomers){
  var request = require("request");

  request({
    url: urlCustomers,
    json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        result = body
        customers = body
      }
  });

}

function getRequireds(urlRequired){
  var request = require("request");

  request({
    url: urlRequired,
    json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        requireds = body
      }
  });

}

function getResult(){
  customers.prop = 'tipo';
  for (var i = customers.length - 1; i >= 0; i--) {
    var require = [];
    for (var j = requireds.length - 1; j >= 0; j--) {
      if (customers[i].user_ID === requireds[j].userID) {
        require.push(requireds[j].tipo);
        console.log("la monda")
      }
    }
    customers[i].tipo = require;
    console.log(require)
  }
}
      
exports.getAll = (req, res) => {
  const urlCustomers = 'https://ay3f7sse28.execute-api.us-east-1.amazonaws.com/prod/dynamoread';
  const urlRequired = 'https://gbtg9p3md6.execute-api.us-east-1.amazonaws.com/prod/item';
  getCustomers(urlCustomers);
  getRequireds(urlRequired);
  getResult();

  console.log("--->Get All Customers: \n" + JSON.stringify(customers));
  console.log("--->Get All services: \n" + JSON.stringify(requireds));
    res.send(customers); 
};