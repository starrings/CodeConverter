var express = require('express');
var app = express();
var logger = require('morgan');
var Cmodule = require('./Code'); 

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('views'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

var code1 = ' ';
app.post('/C', function(req, res){
    if(req.body.code){
        var code0 = req.body.code.split("'");
        var code2 = '';
        var i = 0;
        code0.forEach(element => {
            if(i %2 ==0) code2 += element; 
            i++;           
        });
        code1 = "error"
        if(code2.indexOf('출력') != -1 || code2.indexOf('프린트') != -1 || code2.indexOf('print') != -1 ){
            var printArray = new Array();
            for(var i=0; i<code0.length; i++){
                if(i % 2 != 0) printArray.push(code0[i]);
                console.log(code0[i]);
            }

            code1 = Cmodule.Cprint(printArray);
            
        }
        if(code2.indexOf('선언') != -1){
            code1 = Cmodule.Cvariable(code0[1], code0[3], code0[5]);
        }
        if(code2.indexOf('초기화') != -1 || code2.indexOf('대입') != -1){
            code1 = Cmodule.Cs(code0[1], code0[3]);
        }
        if(code2.indexOf('주석') != -1){
            code1 = Cmodule.Ccomment(code0[1]);
        }
        if(code2.indexOf('더해') != -1 || code2.indexOf('더하') != -1 || code2.indexOf('합') != -1){
            code1 = Cmodule.Cplus(code0[1], code0[3]);
        }
        if(code2.indexOf('빼') != -1 || code2.indexOf('차') != -1){
            code1 = Cmodule.Cminus(code0[1], code0[3])
        }
        if(code2.indexOf('곱') != -1){
            code1 = Cmodule.Cmultiplication(code0[1], code0[3]);
        }
        if(code2.indexOf('나누') != -1 || code2.indexOf('나눗') != -1){
            code1 = Cmodule.Cdivision(code0[1], code0[3]);
        }
        if(code2.indexOf('나머') != -1){
            code1 = Cmodule.Cremainder(code0[1], code0[3]);
        }
        if(code2.indexOf('시프트') != -1 || code2.indexOf('shift') != -1 || code2.indexOf('쉬프트') != -1){
            code1 = Cmodule.Cshift(code0[1], code0[3]);
        }
        if(code2.indexOf('엔드') != -1 || code2.indexOf('and') != -1){
            code1 = Cmodule.Cand(code0[1], code0[3]);
        }
        if(code2.indexOf('or') != -1){
            code1 = Cmodule.Cor(code0[1], code0[3]);
        }
        if(code2.indexOf('not') != -1){
            code1 = Cmodule.Cnot(code0[1]);
        }
        if(code2.indexOf('while') != -1 || code2.indexOf('반복') != -1){
            var whstr = new Array();
            for(var i=3; i<code0.length; i+=2){
                whstr.push(code0[i]);
            }
            code1 = Cmodule.Cwhile(code0[1], whstr);
        }
        if(code2.indexOf('for') != -1){
            var whstr = new Array();
            for(var i=7; i<code0.length; i+=2){
                whstr.push(code0[i]);
            }
            code1 = Cmodule.Cfor(code0[1], code0[3], code0[5], whstr);
        }
        if(code2.indexOf('do') != -1){
            var whstr = new Array();
            for(var i=3; i<code0.length; i+=2){
                whstr.push(code0[i]);
            }
            code1 = Cmodule.Cdowhile(code0[1], whstr);
        }  
        if(code2.indexOf('입력') != -1 || code2.indexOf('input') != -1){
            var printArray = new Array();
            for(var i=0; i<code0.length; i++){
                if(i % 2 != 0) printArray.push(code0[i]);
                console.log(code0[i]);
            }

            code1 = Cmodule.Cscan(printArray);
        }
        if((code2.indexOf('if') != -1 || code2.indexOf('만약') != -1 || code2.indexOf('조건') != -1)){
            var printArray = new Array();
            for(var i=0; i<code0.length; i++){
                if(i % 2 != 0) printArray.push(code0[i]);
                console.log(code0[i]);
            }

            code1 = Cmodule.Cif(printArray);
        }  
        res.redirect('/C');
    }else{
        res.render('C', {title: code1});
    }   
});
app.post('/Python', function(req, res){
    if(req.body.code){
        var code0 = req.body.code.split('"');
        var code2 = '';
        var i = 0;
        code0.forEach(element => {
            if(i %2 ==0) code2 += element; 
            i++;           
        });
        code1 = "error"
        if(code2.indexOf('초기화') != -1 || code2.indexOf('대입') != -1){
            code1 = Cmodule.Ps(code0[1], code0[3]);
        }
        if(code2.indexOf('더하') != -1 || code2.indexOf('더해') != -1 || code2.indexOf('합') != -1){
            code1 = Cmodule.Pplus(code0[1], code0[3]);
        }
        if(code2.indexOf('빼') != -1 || code2.indexOf('차') != -1){
            code1 = Cmodule.Pminus(code0[1], code0[3]);
        }
        if(code2.indexOf('곱') != -1){
            code1 = Cmodule.Pmul(code0[1], code0[3]);
        }
        if(code2.indexOf('나누') != -1 || code2.indexOf('나눗') != -1){
            code1 = Cmodule.Pdiv(code0[1], code0[3]);
        }
        if(code2.indexOf('나머') != -1){
            code1 = Cmodule.Pminus(code0[1], code0[3]);
        }
        if(code2.indexOf('제곱') != -1 || code2.indexOf('만큼 곱') != -1|| code2.indexOf('승') != -1){
            code1 = Cmodule.Psquare(code0[1], code0[3]);
        }
        if(code2.indexOf('몫') != -1){
            code1 = Cmodule.Pshare(code0[1], code0[3]);
        }
        if(code2.indexOf('길이') != -1 || code2.indexOf('len') != -1){
            code1 = Cmodule.Plen(code0[1]);
        }
        if(code2.indexOf('인덱싱') != -1 || code2.indexOf('indexing') != -1){
            code1 = Cmodule.Pindexing(code0[1], code0[3]);
        }
        if(code2.indexOf('슬라이싱') != -1 || code2.indexOf('slice') != -1){
            code1 = Cmodule.Pslicing(code0[1], code0[3], code[5]);
        }
        if(code2.indexOf('갯수') != -1){
            code1 = Cmodule.Pcount(code0[1], code0[3]);
        }
        if(code2.indexOf('위치') != -1){
            code1 = Cmodule.Pfind(code0[1], code0[3]);
        }
        if(code2.indexOf('삽입') != -1){
            code1 = Cmodule.Pjoin(code0[1], code0[3]);
        }
        if(code2.indexOf('대문자') != -1){
            code1 = Cmodule.Pupper(code0[1]);
        }
        if(code2.indexOf('소문자') != -1){
            code1 = Cmodule.Plower(code0[1]);
        }
        if(code2.indexOf('공백 제거') != -1){
            code1 = Cmodule.Pstrip(code0[1], code0[3]);
        }
        if(code2.indexOf('바꾸') != -1){
            code1 = Cmodule.Preplace(code0[1], code0[3], code0[5]);
        }
        if(code2.indexOf('split') != -1){
            code1 = Cmodule.Psplit(code0[1], code0[3]);
        }
        if(code2.indexOf('추가') != -1){
            code1 = Cmodule.Pappend(code0[1], code0[3]);
        }
        if(code2.indexOf('정렬') != -1){
            code1 = Cmodule.Psort(code0[1]);
        }
        if(code2.indexOf('뒤집') != -1){
            code1 = Cmodule.Pcount(code0[1]);
        }
        if(code2.indexOf('요소 삽입') != -1){
            code1 = Cmodule.Pcount(code0[1], code0[3], code0[5]);
        }
        if(code2.indexOf('제거') != -1){
            code1 = Cmodule.Premove(code0[1], code0[3]);
        }
        if(code2.indexOf('pop') != -1){
            code1 = Cmodule.Ppop(code0[1], code0[3]);
        }
        if(code2.indexOf('확장') != -1){
            code1 = Cmodule.Pextend(code0[1], code0[3]);
        }
        if(code2.indexOf('출력') != -1 || code2.indexOf('프린트') != -1 || code2.indexOf('print') != -1){
            var printP = new Array()  
            for(var i =1; i < code0.length; i+=2){
                printP.push(code0[i]);
            }
            code1 = Cmodule.Pprint(printP);
        }
        if(code2.indexOf('입력') != -1 || code2.indexOf('input') != -1 || code2.indexOf('print') != -1){
            code1 = Cmodule.Pprint(code0[1]);
        }
        if(code2.indexOf('만약') != -1 || code2.indexOf('if') != -1 || code2.indexOf('아니라면') != -1){
            var printP = new Array()  
            for(var i =1; i < code0.length; i+=2){
                printP.push(code0[i]);
            }
            code1 = Cmodule.Pif(printP);
        }
        if(code2.indexOf('for') != -1){
            var printP = new Array()  
            for(var i =5; i < code0.length; i+=2){
                printP.push(code0[i]);
            }
            code1 = Cmodule.Pfor(code0[1],code0[3],printP);
        }
        if(code2.indexOf('while') != -1 || code2.indexOf('반복') != -1){
            var printP = new Array()  
            for(var i =3; i < code0.length; i+=2){
                printP.push(code0[i]);
            }
            code1 = Cmodule.Pwhile(code0[1],printP);
        }
        
        
        res.redirect('/Python');
    }else{
        res.render('Python', {title: code1})
    }
})

app.get('/', function(req, res){
    res.render('index', {title: code1});
});
app.get('/C', function(req, res){
    res.render('C', {title: code1});
});
app.get('/Python', function(req, res){
    res.render('Python', {title: code1});
});
app.get('/use', function(req, res){
    res.render('use', {title: code1});
});


app.listen(8080, function(){
    console.log('8080 포트에서 대기 중');
});