var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var login = req.query.login;
    var password = req.query.password;

   const Horseman = require('node-horseman');
   const horseman = new Horseman();

   horseman
       .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
       .open('https://elschool.ru/Logon/Index')
       .type('#login', login)
       .type('#password', password)
       .click('#sub-btn')
       .waitForNextPage({timeout: 30000})
       .open('https://elschool.ru/users/diaries/')
       .evaluate(() => {return document.documentElement.outerHTML})
       .then(function (data) {
           res.send(data)
       }, 'body')
       .close()

});

module.exports = router;


