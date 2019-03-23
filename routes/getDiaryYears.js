/*
    Скрипт для забора годов, которые доступны
    для просмотра учеником.

    Script for getting years, which can be
    viewed by student.

    Nitron Apps, 2019
    SERVER VERSION: 1.0

 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var id = req.query.id;
    var login = req.query.login;
    var password = req.query.password;
    var rooId = req.query.rooid;
    var instituteId = req.query.instituteId;
    var departmentId = req.query.departmentId;

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
        await page.goto('https://elschool.ru/users/diaries/details?rooId=' + rooId
            + '&instituteId=' + instituteId + '&departmentId=' + departmentId + '&pupilId=' + id, {waitUntil: ['networkidle2', 'domcontentloaded']});
        await page.waitForSelector('#spinnerMessageSpan', {hidden: true});
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

        const mainData = await page.evaluate(() => {
            try {
                var data = $('option[model-department-id]');

                var idS = [];
                for (var i = 0; i < data.length; i++) {
                    idS.push({
                        'name': data.eq(i).text(),
                        'departmentId': data.eq(i).attr('model-department-id')
                    })
                }

                return idS;
            } catch (e) {
                return e.toString();
            }
        });
        res.send(JSON.stringify(mainData));

        await browser.close();
    })();
});

module.exports = router;
