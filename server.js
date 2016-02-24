var express = require('express');
var app = express();
var request = require('request');

app.get('/', function(req, res) {
    res.send('Hello Stocks!');
});

app.get('/quote/:symbol', function(req, res) {
    var sym = req.params.symbol.toUpperCase();
    var url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + sym;
    request(url, function(err, result, body) {
        var body = JSON.parse(body)
        console.log(body);
        res.send({amount: body.LastPrice });
    });
    
});

app.get('/purchase/:symbol/:amount', function(req, res) {
    var sym = req.params.symbol;
    var amount = req.params.amount * 1;
    var url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + sym;
     request(url, function(err, result, body) {
        var body = JSON.parse(body)
        console.log(body);
        var price = body.LastPrice * 1;
        var total = price * amount;
        res.send({shares: amount, symbol: sym, total: total});
    });
    
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(process.env.PORT);
    console.log(process.env.IP);
    console.log("Running");
});