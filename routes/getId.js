var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var login = req.query.login;
    var password = req.query.password;

    const Browser = require('zombie');
    var browser = new Browser();

    (async () =>{
        await browser.visit('https://elschool.ru/');
        await browser.fill('#login', login);
        await browser.fill('#password', password);
        const page = await browser.pressButton('#sub-btn', function () {
            return document.documentElement.outerHTML;
        }).catch(() => console.log('catched'));

        res.send(page);
    })();
});

module.exports = router;


