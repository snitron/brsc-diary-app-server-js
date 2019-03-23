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
            await page.goto('https://elschool.ru/', {waitUntil: 'load', timeout: 0});
            await page.type('#login', login);
            await page.type('#password', password);
            await page.click('#sub-btn');
            await page.waitForNavigation().catch(() => console.log("catched"));
            await page.goto('https://elschool.ru/privateoffice', {waitUntil: 'load', timeout: 0});
            await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

            const user = await page.evaluate(() => {
                try {
                    var buttons = $('a.btn.btn-sm.btn-primary');

                    if (buttons.length > 1) {
                        //it is parent

                        var child_ids = [];
                        for (var i = 0; i < buttons.length; i++) {
                            var elem = buttons.eq(i).attr('href');
                            data = String(elem).substring(String(elem).indexOf('?') + 1).split('&');
                            child_ids.push({
                                "rooId": data[0].substring(6),
                                "instituteId": data[1].substring(12),
                                "departmentId": data[2].substring(13),
                                "userId": data[3].substring(8)
                            });
                        }
                        let isParent = true;
                        return {isParent, child_ids};
                    } else {
                        //it is not parent
                        return "CHILD";

                        /*
                        var buttons = document.getElementsByClassName('a.btn.btn-sm.btn-primary');
                        if (buttons.length !== 0)
                            //it is parent

                            var child_ids = [];
                            for(var i = 0; i < buttons.length; i++){
                                var elem = buttons[i].getAttribute('href');
                                data = String(elem).substring(String(elem).indexOf('?') + 1).split('&');
                                child_ids.push({
                                    "rooId": data[0].substring(6),
                                    "instituteId": data[1].substring(12),
                                    "departmentId": data[2].substring(13),
                                    "userId": data[3].substring(8)
                                });
                            }
                            user_id = null;
                        } else {
                            var child_ids = null;
                            var user_id = document.getElementsByClassName('p.col-lg-7.col-md-8.col-sm-8.col-6')[0].text();
                        }*/
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
                            "userId": data[3].substring(8)
                        });
                        let isParent = false;
                        return {isParent, child_ids};
                    } catch (e) {
                        return e.toString();
                    }
                });
                res.send(JSON.stringify(act_data));
            } else {
                res.send(JSON.stringify(user));
            }
            await browser.close()
        }
    )();
});

module.exports = router;


