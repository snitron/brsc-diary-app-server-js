var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var login = req.query.login;
    var password = req.query.password;
    var version = req.query.version;

    let Nightmare = require('nightmare');
    let nightmare = Nightmare({ show: true });

    nightmare
        .goto('https://elschool.ru/')
        .evaluate(() => {
            document.getElementById('login').value = login;
            document.getElementById('password').value = password;
            document.getElementById('sub-btn').click();
        }).wait().end(() => res.send(document.url));


    //res.send(id)
});

module.exports = router;


class UserModel{
    child_model = Array();
    id = "";
}
