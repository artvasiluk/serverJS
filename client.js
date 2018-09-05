const request = require('request');

function findByName(name, cb) { 
    findInPhonebook({name: name}, cb);
}   

function findByPhone(phone, cb) {
    findInPhonebook({phone: phone}, cb);
}

function findInPhonebook(info, cb) {
    request({url: 'http://localhost:3000/info', qs: info}, (err, res, body) => {
        if (err) return cb(err);
        return cb(null, body);
    });
}

function addUser(name, phone, cb) {
    request({
        url: 'http://localhost:3000/addUser',
        method: 'POST',
        json: {name: name, phone: phone}}, (err, res, body) => {
        if (err) return cb(err);
        return cb(null, body);
    });
}

function deleteUser(name, cb) {
    request({
        url: 'http://localhost:3000/deleteUser',
        method: 'DELETE',
        json: {name: name}}, (err, res, body) => {
        if (err) return cb(err);
        return cb(null, body);
    });
}

addUser("kola", 1285, read);

function read(err, res) {
    if (err) throw err;
    console.log(res);
}
