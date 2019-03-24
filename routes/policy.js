/*
    Скрипт для получения ID ученика и
    инормации о его принадлежности к учебным
    заведениям.

    Script for getting user ID and info
    of his school.

    Nitron Apps, 2019
    SERVER VERSION: 1.0

 */

var express = require('express');
var router = express.Router();
const path = require('path');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/htmls/policy.html'))
});


module.exports = router;