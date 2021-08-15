var express = require('express');
var fs = require('fs');
var path  = require('path');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty=true;
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
var current = 1;
var list = [
    {
        id: 1,
        title: '눈썰매장',
        wait: 1,
    },
    {
        id: 2,
        title: '대공연장',
        wait: 1,
    },
    {
        id: 3,
        title: '후룸라이드',
        wait: 1,
    },
    {
        id: 4,
        title: '아이스링크',
        wait: 1,
    },
    {
        id: 5,
        title: '83타워',
        wait: 1,
    },
    {
        id: 6,
        title: '허리케인',
        wait: 1,
    },
    {
        id: 7,
        title: '회전목마',
        wait: 1,
    },
    {
        id: 8,
        title: '범퍼카',
        wait: 1,
    },
    {
        id: 9,
        title: '안데르센하우스',
        wait: 1,
    },
    {
        id: 10,
        title : '벌룬레이스',
        wait: 1,
    },
];
app.post('/incredata', function(req, res){
    var id = req.body.id;
    var wait = req.body.wait;
    console.log('req.body.id :'+ req.body.id+'req.body.wait :'+req.body.wait);
    var d = Number(wait);
    var e = "";
    for(var rowIndex in list){
        if(list[rowIndex].id==Number(id)){
            list[rowIndex].wait += d;
            e = String(list[rowIndex].wait);
            console.log(list);
        }
    }
    fs.writeFile(path.resolve(__dirname,'./data/idclicked/'+id+".txt"), e, function(err){
        if(err) throw err;
        console.log("get Id success!");
    });
    sendId(id);
    res.render('./test.jade', {name: id});
});
app.get('/mappage', function(req,res){
    res.render('./index');
});
function sendId(id){
    var file = path.join(__dirname, 'data/txt/sendfile.txt');
    fs.writeFile(file, id, function(err){
        if(err) throw err;
        else    console.log("send 용 파일 쓰기 success!");
    });
}
app.get('/readfile', function(req,res){
    var file = path.join(__dirname, './data/txt/sendfile.txt');
    fs.readFile(file, 'utf-8', function(err,data){
        res.render('./sending.jade', {id: data});
    });
});
app.get('/testing5', function(req,res){
    var columns = [
        '이름',
        '대기인원',
        '예약',
    ];
    var html = '<html>';
        html += '<head><meta charset="utf-8">';
        html += '<style>';
        html += '*{font-size: 50px;text-align:center}';
        html += 'th{width:2000px;height:150px;}';
        html += 'tbody{width:2000px;height:150px}';
        html += '</style>';
        html += '</head>';
        html += '<body>';
    var table = '<table>';
        table += '<thead>';
        table += '<tr>';
    for(var columnIndex in columns){
        table += '<th style="border: 3px solid rgba(0,0,0,0.2)">';
        table += columns[columnIndex];
        table += '</th>';
    }
    table += '</tr>';
    table += '</thead>';
    table += '<tbody>';
    for(var rowIndex in list){
        elem = list[rowIndex];
        var parse = Number(rowIndex)+1;
        var htmladd =  `<form action="/incredata" method="post">
                            <p>
                                <input type="text" name="wait" />
                            </p>
                            <p>
                                <button type="submit" value=${parse} name="id">${parse}</button>
                            </p>
                        </form>`;
        table += '<tr>';
        for(var columnIndex in columns){
            if(columnIndex==="2"){
                table += '<td style="border: 3px solid rgba(0,0,0,0.2)">';
                table += htmladd;
                table += '</td>';
            }else if(columnIndex==="0"){
                table += '<td style="border: 3px solid rgba(0,0,0,0.2)">';
                table += elem.title;
                table += '</td>';
            }else if(columnIndex==="1"){
                table += '<td style="border: 3px solid rgba(0,0,0,0.2)">';
                table += elem.wait;
                table += '</td>';
            }else{
                continue;
            }
        }
        table += '</tr>';
    }
    html += table;
    html += '</tbody></table>';
    html += '</body>';
    html += '</html>';
    res.send(html);
});
app.get('/showImg',function(req,res){
    var showImgpath = '/images/festival.jpg';
    var output = `
        <p><img src = ${showImgpath} width='500' height='500'></p>
        <p><button type="button" onclick="location.href='http://ip config at cmd.exe:port/mappage'">exit</button></p>
    `;
    res.send(output);
});
app.listen(3000, function(){
    console.log('Connected, 3000 port!');
});