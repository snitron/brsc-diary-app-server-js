var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('yes');
    var login = req.query.login;
    var password = req.query.password;
    var version = req.query.version;

    let Nightmare = require('nightmare');
    let nightmare = Nightmare({ show: true });

    nightmare
        .goto('https://elschool.ru/Logon/Index')
        .then()
        .evaluate(() => {
            res.send('yes');
            document.getElementById('login').value = login;
            document.getElementById('password').value = password;
            document.getElementById('sub-btn').click();
        }).end(() => res.send(document.url));


    //res.send(id)
});

module.exports = router;


class UserModel{
    constructor(child_ids, id){
        this.child_ids = child_ids;
        this.id = id;
    }
}
