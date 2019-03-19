var express = require('express');
var router = express.Router();

const browser = require('zombie');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var login = req.query.login;
    var password = req.query.password;

    browser.visit('https://elschool.ru', function () {
        browser
            .fill('#login', login)
            .fill('#password', password)
            .click('#stb-btn', function () {
                res.send(browser.location.href);
            });

    });
});

module.exports = router;


class UserModel{
    constructor(child_ids, id){
        this.child_ids = child_ids;
        this.id = id;
    }
}
