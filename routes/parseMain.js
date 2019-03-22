var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var id = req.query.id;
    var login = req.query.login;
    var password = req.query.password;
    var rooId = req.query.rooid;
    var instituteId = req.query.instituteId;
    var departmentId = req.query.depatmentId;

    const puppeteer = require('puppeteer');
    const devices = require('puppeteer/DeviceDescriptors');
    const pixel = devices['Pixel 2 XL'];

    (async () => {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
       // await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
        await page.emulate(pixel);
        await page.goto('https://elschool.ru/', {waitUntil: 'load', timeout: 0});
        await page.type('#login', login);
        await page.type('#password', password);
        await page.click('#sub-btn');
        await page.waitForNavigation().catch(() => console.log("catched"));
        await page.goto('https://elschool.ru/users/diaries/details?rooId=' + rooId
            + '&instituteId=' + instituteId + '&departmentId=' + departmentId + '&pupilId=' + id + '&year=2019&week=12', {waitUntil: ['networkidle2', 'domcontentloaded']});
        //await page.waitForSelector('i.fa.fa-pencil-square-o').catch(() => console.log("catched"));
        await page.waitForSelector('span.spinnerMessageSpan', {hidden: true});
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});


        const mainData = await page.evaluate(() => {
            //res.send(document.documentElement.outerHTML);

            try {/*
                var elements = $('table.table-bordered.DiaryTable.d-none.d-md-table:not([lesson])');
                var dayNames = $('h3.weekDayDiary');

                var days = [];
                for(var i = 0; i < elements.length; i++){
                    var dayShedule = {};
                    dayShedule.lessons = [];
                    dayShedule.count = 0;
                    dayShedule.marks = [];
                    dayShedule.homeworks = [];
                    dayShedule.isWeekend = false;
                    dayShedule.dayName = "";
                    dayShedule.teacherComment = [];
                    dayShedule.hrefHw = [[]];
                    dayShedule.hrefHwNames = [[]];


                    var trS = elements.eq(i).find('tbody').eq(0).find('tr');

                    for(var j = 0; j < trS.length; j += 2){
                        if(trS.eq(j).find('td').eq(3).text() === 'Нет занятий'){
                            dayShedule.count = 0;
                            dayShedule.isWeekend = true;
                            break;
                        }

                        var tdS = trS.eq(j).find('td');
                        dayShedule.lessons[j] = tdS.eq(2).text();
                        dayShedule.homeworks[j] = tdS.eq(3).find('div').not('.diary-homework-list').eq(0).text();
                        dayShedule.marks[j] = trS.eq(j).find('td.diary-lesson-mark-cell').eq(0).text();
                        dayShedule.teacherComment[j] = trS.eq(j).find('td.diary-teacher-comment').eq(0).text();

                        console.log(dayShedule.lessons[j], dayShedule.homeworks[j], dayShedule.marks[j], dayShedule.teacherComment[j]);

                        if(tdS.eq(3).find('a.HomeWorkFile').length !== 0){
                            var hrefsTd = tdS.eq(3).find('a.HomeWorkFile');
                            for (var k = 0; k < hrefsTd.length; k++){
                                dayShedule.hrefHw[j][k] = hrefsTd.eq(i).attr('href');
                                dayShedule.hrefHwNames[j][k] = hrefsTd.eq(i).text().trim();
                            }
                        }

                        dayShedule.isWeekend = false;
                    }
                    dayShedule.dayName = dayNames.eq(i).text().trim();
                    days.push(dayShedule);
                }

                return days;
*/
                return document.documentElement.outerHTML;
            } catch (e) {
                return e.toString();
            }
        });

        res.send(mainData);

        await browser.close();
    })();
});

module.exports = router;
