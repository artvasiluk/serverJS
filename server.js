const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const mongoClient = require("mongodb").MongoClient;
const users = require('./logpas.json');


const app = express();
const url = 'mongodb://' + user.login + ':' + user.pass + user.mongoURI;
const user = users['Artem'];

app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

app.get('/', function (req, res) {                      //working hello
  res.send('Hello, this is my phonebook!');
  console.log('Sending hello!');
});

app.get('/info', function (req, res) {                  //working info
    mongoClient.connect(url, function(err, client){
        if(err) throw console.log(err);
        const db = client.db(user.db.name);
        const collection = db.collection(user.db.collection);
        
        collection.find().toArray(function(err, results){
            if(err) throw console.log(err);
            res.send(results);
            client.close();
        });
    console.log('Sending all contacts of phonebook.');
    });
});

app.post('/addUser', function (req, res) {
    let body = req.body;

    mongoClient.connect(url, function(err, client){
        if(err) throw console.log(err);
        const db = client.db(user.db.name);
        const collection = db.collection(user.db.collection);
        
        collection.findOneAndUpdate({name: body.name}, {$set: {phone: body.phone}}, function(err, results){  //working update
            if(err) throw console.log(err);
            res.send(results);
            client.close();
        });

        collection.insertOne(body, function(err, cursor) {                                                 //working add
            if(err) throw console.log(err);
            console.log('Contact added ' + body);
            client.close();
        });
    });
});

app.delete('/deleteUser', function (req, res) {   //working delete
    let body = req.body;

    mongoClient.connect(url, function(err, client){
        if(err) throw console.log(err);
        const db = client.db(user.db.name);
        const collection = db.collection(user.db.collection);

        collection.findOneAndDelete({name: body.name}, function(err, results){
            if(err) throw console.log(err);
            res.send(results);
            console.log('Contact deleted.');
            client.close();
        });
    });
});

function findContact(name, cb) {
    collection.find({name: name}).toArray(function(err, results){
        if(err) throw console.log(err);
        res.send(results);
        client.close();
    });
}

function updateContact(err, name, phone) {
    collection.findOneAndUpdate({name: name}, {$set: {phone: phone}}, function(err, results){
        if(err) throw console.log(err);
        client.close();
    });
}

function addContact(err, obj) {
    collection.insertOne(obj, function(err, cursor) {
        if(err) throw console.log(err);
        client.close();
    });
}