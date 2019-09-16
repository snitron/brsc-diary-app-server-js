
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.get('User-Agent') !== 'Nitron Apps BRSC Diary Http Connector') {
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
                        const result = await page.evaluate(() => { var res = [];
                        var infos = $('table.pesonal-data__info.personal-data__info_show').find('tr');

                        var info = [];
                        for(var i = 0; i < infos.length; i++){
                            info.push({
                                name: infos.eq(i).find("td.personal-data__info-title").eq(0).text(),
                                value: infos.eq(i).find("td.personal-data__info-value").eq(0).text()
                            })
                        }

                            if ($('h4.flex-grow-1.m-0').length === 0){ // ребёнок
                                var trs =  $('table.table-striped').eq(0).find('tr');

                                for(var i = 1; i < trs.length; i++){
                                    var tds = trs.eq(i).find("td");
                                    res.push({
                                        "pay": trs.eq(i).find('td.text-center').eq(0).children().eq(0).attr("data-url"),
                                        "name": tds.eq(0).text(),
                                        "bill": tds.eq(1).text().replace(/[\n\t\r]/g,"").trim(),
                                        "balance": tds.eq(2).text()
                                    })
                                }
                                return {isChild: true, res, info};
                            } else {
                                let names = $('h4.flex-grow-1.m-0');

                                for(var k = 0; k < names.length; k++){
                                    var trs =  $('table.table-striped').eq(k).find('tr');

                                    for(var i = 1; i < trs.length; i++){
                                        var tds = trs.eq(i).find("td");
                                        res.push({
                                            "child_name": names.eq(k).text(),
                                            "pay": trs.eq(i).find('td.text-center').eq(0).children().eq(0).attr("data-url"),
                                            "name": tds.eq(0).text(),
                                            "bill": tds.eq(1).text().replace(/[\n\t\r]/g,"").trim(),
                                            "balance": tds.eq(2).text()
                                        })
                                    }
                                }

                                return {isChild: false, res, info};
                            }});

                      res.send(JSON.stringify(result));
                        await page.close();
                        await browser.close();
                    });
                if (!catched){
                    await page.goto('https://elschool.ru/privateoffice', {waitUntil: 'load', timeout: 0});
                    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
                    const result = await page.evaluate(() => { var res = [];
                        var infos = $('table.pesonal-data__info.personal-data__info_show').find('tr');

                        var info = [];
                        for(var i = 0; i < infos.length; i++){
                            info.push({
                                name: infos.eq(i).find("td.personal-data__info-title").eq(0).text(),
                                value: infos.eq(i).find("td.personal-data__info-value").eq(0).text()
                            })
                        }


                        if ($('h4.flex-grow-1.m-0').length === 0){ // ребёнок
                            var trs =  $('table.table-striped').eq(0).find('tr');

                            for(var i = 1; i < trs.length; i++){
                                var tds = trs.eq(i).find("td");
                                res.push({
                                    "pay": trs.eq(i).find('td.text-center').eq(0).children().eq(0).attr("data-url"),
                                    "name": tds.eq(0).text(),
                                    "bill": tds.eq(1).text().replace(/[\n\t\r]/g,"").trim(),
                                    "balance": tds.eq(2).text()
                                })
                            }
                            return {isChild: true, res, info};
                        } else {
                            let names = $('h4.flex-grow-1.m-0');

                            for(var k = 0; k < names.length; k++){
                                var trs =  $('table.table-striped').eq(k).find('tr');

                                for(var i = 1; i < trs.length; i++){
                                    var tds = trs.eq(i).find("td");
                                    res.push({
                                        "child_name": names.eq(k).text(),
                                        "pay": trs.eq(i).find('td.text-center').eq(0).children().eq(0).attr("data-url"),
                                        "name": tds.eq(0).text(),
                                        "bill": tds.eq(1).text().replace(/[\n\t\r]/g,"").trim(),
                                        "balance": tds.eq(2).text()
                                    })
                                }
                            }

                            return {isChild: false, res, info};
                        }});

                    res.send(JSON.stringify(result));
                    await page.close();
                    await browser.close();
                }
            }
        )();
    } else {
        res.send('');
    }
});

module.exports = router;

