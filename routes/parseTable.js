/*
    Скрипт для получения данных из табеля
    успеваемости.

    Script for getting data from table.

    Nitron Apps, 2019
    SERVER VERSION: 1.0

 */


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.get('User-Agent') === 'Nitron Apps BRSC Diary Http Connector') {
        var id = req.query.id;
        var login = req.query.login;
        var password = req.query.password;
        var rooId = req.query.rooid;
        var instituteId = req.query.instituteId;
        var departmentId = req.query.departmentId;
        var catched = false;

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
                    catched = true;
                    await page.goto('https://elschool.ru/users/diaries/grades?rooId=' + rooId
                        + '&instituteId=' + instituteId + '&departmentId=' + departmentId + '&pupilId=' + id, {waitUntil: ['networkidle2', 'domcontentloaded']});
                    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});


                    const mainData = await page.evaluate(() => {

                        try {
                            const trS = $('table.table-bordered.GradesTable').eq(0).find('tbody').eq(0).find('tr');

                            var data = [];
                            for (var i = 0; i < trS.length; i++) {
                                var lessonTable = {};
                                lessonTable.lesson = '';
                                lessonTable.average_mark1 = '';
                                lessonTable.m1 = '';
                                lessonTable.average_mark2 = '';
                                lessonTable.m2 = '';
                                lessonTable.average_mark3 = '';
                                lessonTable.m3 = '';
                                lessonTable.average_mark4 = '';
                                lessonTable.m4 = '';

                                var tdS = trS.eq(i).find('td');

                                for (var j = 1; j < 10; j++) {
                                    switch (j) {
                                        case 1:
                                            lessonTable.lesson = tdS.eq(j).text().trim().replace(/\n/g, '');
                                            break;
                                        case 2:
                                            lessonTable.average_mark1 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        case 3:
                                            lessonTable.m1 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        case 4:
                                            lessonTable.average_mark2 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        case 5:
                                            lessonTable.m2 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        case 6:
                                            lessonTable.average_mark3 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        case 7:
                                            lessonTable.m3 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        case 8:
                                            lessonTable.average_mark4 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        case 9:
                                            lessonTable.m4 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                data.push(lessonTable);
                            }

                            return data;
                        } catch (e) {
                            return e.toString()
                        }
                    });
                    await page.close();
                    await browser.close();
                    res.send(JSON.stringify(mainData));
                });
            if (!catched) {
                await page.goto('https://elschool.ru/users/diaries/grades?rooId=' + rooId
                    + '&instituteId=' + instituteId + '&departmentId=' + departmentId + '&pupilId=' + id, {waitUntil: ['networkidle2', 'domcontentloaded']});
                //await page.waitForSelector('#spinnerMessageSpan', {hidden: true});
                await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

                const mainData = await page.evaluate(() => {

                    try {
                        const trS = $('table.table-bordered.GradesTable').eq(0).find('tbody').eq(0).find('tr');

                        var data = [];
                        for (var i = 0; i < trS.length; i++) {
                            var lessonTable = {};
                            lessonTable.lesson = '';
                            lessonTable.average_mark1 = '';
                            lessonTable.m1 = '';
                            lessonTable.average_mark2 = '';
                            lessonTable.m2 = '';
                            lessonTable.average_mark3 = '';
                            lessonTable.m3 = '';
                            lessonTable.average_mark4 = '';
                            lessonTable.m4 = '';

                            var tdS = trS.eq(i).find('td');

                            for (var j = 1; j < 10; j++) {
                                switch (j) {
                                    case 1:
                                        lessonTable.lesson = tdS.eq(j).text().trim().replace(/\n/g, '');
                                        break;
                                    case 2:
                                        lessonTable.average_mark1 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    case 3:
                                        lessonTable.m1 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    case 4:
                                        lessonTable.average_mark2 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    case 5:
                                        lessonTable.m2 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    case 6:
                                        lessonTable.average_mark3 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    case 7:
                                        lessonTable.m3 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    case 8:
                                        lessonTable.average_mark4 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    case 9:
                                        lessonTable.m4 = tdS.eq(j).text().trim().replace(/\n/g, '').replace(/ /g, '');
                                        break;
                                    default:
                                        break;
                                }
                            }
                            data.push(lessonTable);
                        }

                        return data;
                    } catch (e) {
                        return e.toString()
                    }
                });
                await page.close();
                await browser.close();
                res.send(JSON.stringify(mainData));
            }
        })();
    } else {
        res.send('');
    }
});

module.exports = router;
