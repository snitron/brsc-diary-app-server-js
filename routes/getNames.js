var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var login = req.query.login;
    var password = req.query.password;
    var option = req.query.option;

    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
        await page.goto('https://elschool.ru/', {waitUntil: 'load', timeout: 0});
        await page.type('#login', login);
        await page.type('#password', password);
        await page.click('#sub-btn');
        await page.waitForNavigation().catch(() => console.log("catched"));
        await page.goto('https://elschool.ru/privateoffice/', {waitUntil: ['networkidle2', 'domcontentloaded']});
        await page.waitForSelector('#spinnerMessageSpan', {hidden: true});
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

        const mainData = await page.evaluate((option) => {
            try {
                var userNames = {};

                userNames.child_ids = [];
                userNames.name = '';

                if (option=== 'student') {
                    userNames.child_ids = null;
                    userNames.name = $('h1.text-center').eq(0).text().trim();
                } else if (option === 'parent') {
                    var childNames = $('div.col-lg-6.col-md-12.col-sm-6.col-12').eq(0)
                        .find('p.col-lg-7.col-md-8.col-sm-8.col-6');

                    for (var i = 0; i < childNames.length; i++)
                        userNames.child_ids.push(childNames.eq(i).text().trim());

                    userNames.name = $('h1.text-center').eq(0).text().trim();
                }

                return userNames;
            } catch (e) {
                return e.toString();
            }
        }, option);
        res.send(JSON.stringify(mainData));

        await browser.close();
    })();
});

module.exports = router;