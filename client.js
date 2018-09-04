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

addUser("IRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", 8888888888888888888888888888888888888888888, read);

function addUser(name, phone, cb) {
    request({
        url: 'http://localhost:3000/addUser',
        method: 'POST',
        json: {name: name, phone: phone}}, (err, res, body) => {
        if (err) return cb(err);
        return cb(null, body);
    });
}

function read(err, res) {
    if (err) throw err;
    console.log(res);
}

//addUser('ola', 0101, read);
/*
const options = {
    method: 'POST',
    uri: 'http://localhost:3000/addUser',
    body: {
       name: 'ola',
       phone: 112
    },
    // json: true
    // Тело запроса приводится к формату JSON автоматически
}
request(options)
    .then(function (response) {
        // Обработка ответа
    })
    .catch(function (err) {
        // Работа с ошибкой
    })*/