/*
    Скрипт для получения ID ученика и
    инормации о его принадлежности к учебным
    заведениям.

    Script for getting user ID and info
    of his school.

    Nitron Apps, 2019
    SERVER VERSION: 1.0

 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.header('User-Agent') === 'Nitron Apps BRSC Diary Http Connector') {
        var login = req.query.login;
        var password = req.query.password;
        var catched = false;

        const puppeteer = require('puppeteer');

        (async () => {
                const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
                const page = await browser.newPage();
                await page.goto('https://elschool.ru/', {waitUntil: 'load', timeout: 0});
                await page.type('#login', login);
                await page.type('#password', password);
                await page.click('#sub-btn');
                await page.waitForNavigation({waitUntil: 'load', timeout: 10000}).catch(
                    async () => {
                        catched = true;
                        await page.goto('https://elschool.ru/privateoffice', {waitUntil: 'load', timeout: 0});
                        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
                        const user = await page.evaluate(() => {
                            try {
                                const buttons = $('a.btn.btn-sm.btn-primary');
                                if (buttons.length > 1) {
                                    //it is parent

                                    var child_ids = [];
                                    var childNames = $('div.col-lg-6.col-md-12.col-sm-6.col-12').eq(0)
                                        .find('p.col-lg-7.col-md-8.col-sm-8.col-6');

                                    for (var i = 0; i < buttons.length; i++) {
                                        var elem = buttons.eq(i).attr('href');
                                        data = String(elem).substring(String(elem).indexOf('?') + 1).split('&');
                                        child_ids.push({
                                            "rooId": data[0].substring(6),
                                            "instituteId": data[1].substring(12),
                                            "departmentId": data[2].substring(13),
                                            "userId": data[3].substring(8),
                                            "userName": childNames.eq(i).text().trim()
                                        });
                                    }
                                    let isParent = true;
                                    let parentName = $('h1.text-center').eq(0).text().trim();
                                    return {isParent, parentName, child_ids};
                                } else {
                                    //it is not parent
                                    return "CHILD";
                                }

                            } catch
                                (e) {
                                return e.toString();
                            }
                        });

                        if (user === "CHILD") {
                            await page.goto('https://elschool.ru/users/diaries/', {waitUntil: 'load', timeout: 0});
                            const act_data = await page.evaluate(() => {
                                try {
                                    var elem = window.location.href;
                                    var child_ids = [];
                                    data = String(elem).substring(String(elem).indexOf('?') + 1).split('&');
                                    child_ids.push({
                                        "rooId": data[0].substring(6),
                                        "instituteId": data[1].substring(12),
                                        "departmentId": data[2].substring(13),
                                        "userId": data[3].substring(8),
                                        "userName": $('h4').eq(0).text().trim()
                                    });
                                    let isParent = false;
                                    let parentName = null;
                                    return {isParent, parentName, child_ids};
                                } catch (e) {
                                    return e.toString();
                                }
                            });
                            res.send(JSON.stringify(act_data));
                        } else {
                            res.send(JSON.stringify(user));
                        }
                        await page.close();
                        await browser.close();
                    });
                if (!catched) {
                    await page.goto('https://elschool.ru/privateoffice', {waitUntil: 'load', timeout: 0});
                    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

                    const user = await page.evaluate(() => {
                        try {
                            const buttons = $('a.btn.btn-sm.btn-primary');
                            if (buttons.length > 1) {
                                //it is parent

                                var child_ids = [];
                                var childNames = $('div.col-lg-6.col-md-12.col-sm-6.col-12').eq(0)
                                    .find('p.col-lg-7.col-md-8.col-sm-8.col-6');

                                for (var i = 0; i < buttons.length; i++) {
                                    var elem = buttons.eq(i).attr('href');
                                    data = String(elem).substring(String(elem).indexOf('?') + 1).split('&');
                                    child_ids.push({
                                        "rooId": data[0].substring(6),
                                        "instituteId": data[1].substring(12),
                                        "departmentId": data[2].substring(13),
                                        "userId": data[3].substring(8),
                                        "userName": childNames.eq(i).text().trim()
                                    });
                                }
                                let isParent = true;
                                let parentName = $('h1.text-center').eq(0).text().trim();
                                return {isParent, parentName, child_ids};
                            } else {
                                //it is not parent
                                return "CHILD";
                            }

                        } catch
                            (e) {
                            return e.toString();
                        }
                    });

                    if (user === "CHILD") {
                        await page.goto('https://elschool.ru/users/diaries/', {waitUntil: 'load', timeout: 0});
                        const act_data = await page.evaluate(() => {
                            try {
                                var elem = window.location.href;
                                var child_ids = [];
                                data = String(elem).substring(String(elem).indexOf('?') + 1).split('&');
                                child_ids.push({
                                    "rooId": data[0].substring(6),
                                    "instituteId": data[1].substring(12),
                                    "departmentId": data[2].substring(13),
                                    "userId": data[3].substring(8),
                                    "userName": $('h4').eq(0).text().trim()
                                });
                                let isParent = false;
                                let parentName = null;
                                return {isParent, parentName, child_ids};
                            } catch (e) {
                                return e.toString();
                            }
                        });
                        res.send(JSON.stringify(act_data));
                    } else {
                        res.send(JSON.stringify(user));
                    }
                    await page.close();
                    await browser.close();
                }
            }
        )();
    } else {
        res.send('');
    }
})
;

module.exports = router;


