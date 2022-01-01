const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');

// Initialize express
const app = express();

// Initialize body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


function save(data) {
  fs.writeFile('domain-list.json', JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

request('https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        save(JSON.parse(body));
    }
    else {
        console.log(error);
    }
});

setTimeout(function () {

    request('https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            save(JSON.parse(body));
        }
        else {
            console.log(error);
        }
    });
}, 3600000);

// Create a route checklink and check if domain-list.json contains the query
app.get('/checklink', function (req, res) {
    fs.readFile('domain-list.json', function (err, data) {
        if (err) res.status(500).send('Server side error occured');
        // Parse the data
        var domainList = JSON.parse(data);
        var domain = req.query.domain;
        var domain = domain.split('/');
        // Check if domain contains any subfolder, if it does trim it
        if (domain[2]) {
            domain = domain[2];
        }
        else {
            domain = domain[0];
        }
        // Check if domain contains any subdomain, if it does trim it
        if (domain.includes('.')) {
            domain = domain.split('.');
            domain = domain[domain.length - 2] + '.' + domain[domain.length - 1];
        }
        // Check if domain is in domain-list.json
        if (domainList.domains.includes(domain)) {
            res.status(200).send('Domain is in the list');
        }
        else {
            res.status(404).send('Domain is not in the list');
        }
    
    });
});

// Start the server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
