const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const mongoClient = require("mongodb").MongoClient;

const app = express();
const jsonParser = bodyParser.json();
const url = 'mongodb://kate:kate123@ds157901.mlab.com:57901/base1'

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
    let i = phonebook.findIndex(contact => contact.name === body.name);
    
    if(i !== -1) {
        phonebook[i] = body;
        res.send("Information of contact was updated");
    } else {
        phonebook.push(body);
        res.send('Contact was added');
    }

    console.log(phonebook);
    console.log('post send');
    
    mongoClient.connect(url, function(err, client){
        if(err) throw err;
        const db = client.db('base1');
        const collection = db.collection('phonebook');
        
        collection.insertOne(body, (function(err, cursor) {
            console.log('Contact added ' + body);
        }));
    });
});

app.delete('/deleteUser', function (req, res) {
    let body = req.body;
    
    let i = phonebook.findIndex(contact => contact.name === body.name);
    
    if(i !== -1) {
        phonebook.splice(i, 1);
        res.send("Contact was deleted");
    } else {
        res.send('Contact not found');
    }

    console.log(phonebook);
    console.log('delete send')
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
