var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var login = req.query.login;
    var password = req.query.password;

    const Nightmare = require('nightmare');

    (async () => {
            const nightmare = await Nightmare({show: true});
            const result = await nightmare
                .goto('https://elschool.ru/Logon/Index')
                .type('#login', login)
                .type('#password', password)
                .click('#sub-btn')
                .goto('https://elschool.ru/users/diaries')
                .evaluate(() => {
                    return document.documentElement.outerHTML
                })
                .catch(() => res.send('error'))
                .end();

            res.send(result);
        }
    )();
});

module.exports = router;


