var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var login = req.query.login;
    var password = req.query.password;

    console.log('GOT');
    const Nightmare = require('nightmare');
    console.log('NGHTMR INIT');
    const nightmare = Nightmare({show: true});
    console.log('NIGHTMR CRTD');
    nightmare
        .goto('https://elschool.ru/Logon/Index')
        .type('#login', login)
        .type('#password', password)
        .click('#sub-btn')
        .goto('https://elschool.ru/users/diaries')
        .evaluate(() => {
            try {
                console.log('EVLT');
                return document.documentElement.outerHTML;
            } catch (e) {
                return e.toString();
            }
        })
        .end()
        .then((result) => res.send(result()))
        .catch(() => console.log('error'));
    console.log('SCRIPT END')

});

module.exports = router;


