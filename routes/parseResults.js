/*
    Скрипт для получения данных из табеля
    итоговых оценок.

    Script for getting data from results
    table.

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
        await page.waitForNavigation({waitUntil: 'load', timeout: 10000}).catch(
            async () => {
                await page.goto('https://elschool.ru/users/diaries/results?rooId=' + rooId
                    + '&instituteId=' + instituteId + '&departmentId=' + departmentId + '&pupilId=' + id, {waitUntil: ['networkidle2', 'domcontentloaded']});
                await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});



                const mainData = await page.evaluate(() => {
                    try {
                        const trS = $('#result-marks-table').eq(0).find('tbody').eq(0).find('tr');

                        var data = [];

                        if ($('#result-marks-table').eq(0).find('tbody').eq(0).find('tr').eq(0).find('td').length === 10) {
                            for (var i = 0; i < trS.length; i++) {
                                var lessonResults = {};

                                lessonResults.lesson = '';
                                lessonResults.m1 = '';
                                lessonResults.m2 = '';
                                lessonResults.m3 = '';
                                lessonResults.m4 = '';
                                lessonResults.y = '';
                                lessonResults.res = '';
                                lessonResults.test = '';
                                lessonResults.isHalfYear = false;

                                var tdS = trS.eq(i).find('td');


                                if (tdS.eq(1).text().trim() === '' &&
                                    tdS.eq(2).text().trim() === '' &&
                                    tdS.eq(3).text().trim() === '' &&
                                    tdS.eq(4).text().trim() === '' &&
                                    (tdS.eq(5).text().trim() !== '' || tdS.eq(6).text().trim()))
                                    lessonResults.isHalfYear = true;

                                lessonResults.lesson = tdS.eq(0).text();

                                if (lessonResults.isHalfYear) {
                                    lessonResults.m1 = tdS.eq(5).text().trim();
                                    lessonResults.m2 = tdS.eq(6).text().trim();
                                } else {
                                    lessonResults.m1 = tdS.eq(1).text().trim();
                                    lessonResults.m2 = tdS.eq(2).text().trim();
                                    lessonResults.m3 = tdS.eq(3).text().trim();
                                    lessonResults.m4 = tdS.eq(4).text().trim();
                                }

                                lessonResults.y = tdS.eq(7).text().trim();
                                lessonResults.test = tdS.eq(8).text().trim();
                                lessonResults.res = tdS.eq(9).text().trim();

                                data.push(lessonResults);
                            }
                        } else {
                            for (var i = 0; i < trS.length; i++) {
                                var lessonResults = {};

                                lessonResults.lesson = '';
                                lessonResults.m1 = '';
                                lessonResults.m2 = '';
                                lessonResults.m3 = '';
                                lessonResults.m4 = '';
                                lessonResults.y = '';
                                lessonResults.res = '';
                                lessonResults.test = '';
                                lessonResults.isHalfYear = false;

                                var tdS = trS.eq(i).find('td');

                                lessonResults.lesson = tdS.eq(0).text();

                                lessonResults.m1 = tdS.eq(1).text().trim();
                                lessonResults.m2 = tdS.eq(2).text().trim();
                                lessonResults.m3 = tdS.eq(3).text().trim();
                                lessonResults.m4 = tdS.eq(4).text().trim();

                                lessonResults.test = tdS.eq(5).text().trim();
                                lessonResults.res = tdS.eq(6).text().trim();

                                data.push(lessonResults);
                            }
                        }

                        return data;
                    } catch (e) {
                        return e.toString()
                    }
                });
                await page.close();
                await browser.close();
                res.send(mainData);    });
        await page.goto('https://elschool.ru/users/diaries/results?rooId=' + rooId
            + '&instituteId=' + instituteId + '&departmentId=' + departmentId + '&pupilId=' + id, {waitUntil: ['networkidle2', 'domcontentloaded']});
     //   await page.waitForSelector('#spinnerMessageSpan', {hidden: true});
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

        const mainData = await page.evaluate(() => {
            try {
                const trS = $('#result-marks-table').eq(0).find('tbody').eq(0).find('tr');

                var data = [];

                if ($('#result-marks-table').eq(0).find('tbody').eq(0).find('tr').eq(0).find('td').length === 10) {
                    for (var i = 0; i < trS.length; i++) {
                        var lessonResults = {};

                        lessonResults.lesson = '';
                        lessonResults.m1 = '';
                        lessonResults.m2 = '';
                        lessonResults.m3 = '';
                        lessonResults.m4 = '';
                        lessonResults.y = '';
                        lessonResults.res = '';
                        lessonResults.test = '';
                        lessonResults.isHalfYear = false;

                        var tdS = trS.eq(i).find('td');


                        if (tdS.eq(1).text().trim() === '' &&
                            tdS.eq(2).text().trim() === '' &&
                            tdS.eq(3).text().trim() === '' &&
                            tdS.eq(4).text().trim() === '' &&
                            (tdS.eq(5).text().trim() !== '' || tdS.eq(6).text().trim()))
                            lessonResults.isHalfYear = true;

                        lessonResults.lesson = tdS.eq(0).text();

                        if (lessonResults.isHalfYear) {
                            lessonResults.m1 = tdS.eq(5).text().trim();
                            lessonResults.m2 = tdS.eq(6).text().trim();
                        } else {
                            lessonResults.m1 = tdS.eq(1).text().trim();
                            lessonResults.m2 = tdS.eq(2).text().trim();
                            lessonResults.m3 = tdS.eq(3).text().trim();
                            lessonResults.m4 = tdS.eq(4).text().trim();
                        }

                        lessonResults.y = tdS.eq(7).text().trim();
                        lessonResults.test = tdS.eq(8).text().trim();
                        lessonResults.res = tdS.eq(9).text().trim();

                        data.push(lessonResults);
                    }
                } else {
                    for (var i = 0; i < trS.length; i++) {
                        var lessonResults = {};

                        lessonResults.lesson = '';
                        lessonResults.m1 = '';
                        lessonResults.m2 = '';
                        lessonResults.m3 = '';
                        lessonResults.m4 = '';
                        lessonResults.y = '';
                        lessonResults.res = '';
                        lessonResults.test = '';
                        lessonResults.isHalfYear = false;

                        var tdS = trS.eq(i).find('td');

                        lessonResults.lesson = tdS.eq(0).text();

                        lessonResults.m1 = tdS.eq(1).text().trim();
                        lessonResults.m2 = tdS.eq(2).text().trim();
                        lessonResults.m3 = tdS.eq(3).text().trim();
                        lessonResults.m4 = tdS.eq(4).text().trim();

                        lessonResults.test = tdS.eq(5).text().trim();
                        lessonResults.res = tdS.eq(6).text().trim();

                        data.push(lessonResults);
                    }
                }

                return data;
            } catch (e) {
                return e.toString()
            }
        });
        await page.close();
        await browser.close();
        res.send(mainData);

    })();
});

module.exports = router;
