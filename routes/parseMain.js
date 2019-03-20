var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    var login = req.query.login;
    var password = req.query.password;
    var rooId = req.query.rooid;
    var instituteId = req.query.instituteId;
    var departmentId = req.query.depatmentId;


    res.send(id)
});

module.exports = router;
