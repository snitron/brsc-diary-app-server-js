var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var login = req.query.login;
    var password = req.query.password;

    const Nightmare = require('nightmare');
    const nightmare = Nightmare();

    nightmare
        .goto('https://elschool.ru/Logon/Index')
        .type('#login', login)
        .type('#password', password)
        .click('#sub-btn')
        .wait('#navbar-cheat')
        .goto('https://elschool.ru/Logon/Index')
        .evaluate(() => {return document.documentElement.outerHTML})
        .end()
        .then((text) => res.send(text));
});

module.exports = router;


