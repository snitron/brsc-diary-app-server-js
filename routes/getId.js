var express = require('express');
var router = express.Router();
var Horseman = require('node-horseman');
var horseman = new Horseman();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var login = req.query.login;
    var password = req.query.password;

    horseman
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .open('https://elschool.ru/')
        .type('#login', login)
        .type('#password', password)
        .click('#sub-btn')
        .waitForNextPage({timeout: 30000})
        .do(() => {
            res.send(url);
        })
        .log()
        .close();
});

module.exports = router;


class UserModel{
    constructor(child_ids, id){
        this.child_ids = child_ids;
        this.id = id;
    }
}
