var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var login = req.query.login;
    var password = req.query.password;
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto('https://elschool.ru/');
        await page.type('#login', login);
        await page.type('#password', password);
        await page.click('#sub-btn');

        await page.waitForNavigation();

        res.send(page.url());

        await browser.close()
    })();
});

module.exports = router;


class UserModel {
    constructor(child_ids, id) {
        this.child_ids = child_ids;
        this.id = id;
    }
}
