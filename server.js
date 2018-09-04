const express = require('express');
const app = express();
const bodyParser = require("body-parser");

//app.use(bodyParser());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello, this is my phonebook!');
  console.log('sending hello');
});

app.get('/info', function (req, res) {
    let contact = req.query;
    let answer = search(contact);
    answer = JSON.stringify(answer);
    res.send(answer);
    console.log('sending info ' + answer);
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/addUser', function (req, res) {
    let body = req.body;
    console.log(body);
    res.send("response");
    console.log('post send')
});

let phonebook = [
    {
        name: 'vasya',
        phone: '12345'
    },
    {
        name: 'petya',
        phone: '67890'
    },
    {
        name: 'ira',
        phone: '1488'
    }
];

function search(contact) {
    for (let i = 0; i < phonebook.length; i++) {
        if (phonebook[i].name === contact.name || phonebook[i].phone === contact.phone) {
            return phonebook[i];
        }
    }
    return 'Contact not found.';
}
