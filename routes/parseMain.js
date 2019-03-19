var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    var login = req.query.login;
    var password = req.query.password;
    res.send(id)
});

module.exports = router;
