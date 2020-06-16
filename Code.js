// var express = require('express');
// var app = express();
// var logger = require('morgan');

// app.use(logger('dev'));
// app.use(express.static('public'));
// app.use(express.urlencoded({extended: true}));

// app.set('view engine', 'ejs');
// app.set('views', './views');
// var exports = module.exports = {};

var Ccode = {
    Cvariable: function(a, b, c){
        if(c){
            return a+' '+b+' = '+c+';'; 
        }else{
            return a+' '+b+';'; 
        }
    },
    Cs: function(b, c){
        return b+' = '+c+';';
    },
    Cprint: function(b){ 
        var printstr = '';
        var variablestr = '';
        var checkvar = 0;

        b.forEach(element => {
               if(element.substring(0,1) == '^'){
                   checkvar = 1;
                   if(element.indexOf('int') != -1){
                        printstr += '%d';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('float') != -1){
                        printstr += '%f';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('short') != -1){
                        printstr += '%hd';
                        variablestr += ',' + (element.split(' ')[1]).substring(0, element.length - 1);
                    }else if(element.indexOf('unsigned long') != -1){
                        printstr += '%ld';
                        variablestr += ',' + (element.split(' ')[1]).substring(0, element.length - 1);
                    }else if(element.indexOf('long long') != -1){
                        printstr += '%lld';
                        variablestr += ',' + (element.split(' ')[1]).substring(0, element.length - 1);
                    }else if(element.indexOf('long') != -1){
                        printstr += '%lu';
                        variablestr += ',' + (element.split(' ')[1]).substring(0, element.length - 1);
                    }else if(element.indexOf('char') != -1){
                        printstr += '%c';
                        variablestr += ',' + (element.split(' ')[1]).substring(0, element.length - 1);
                    }else if(element.indexOf('double') != -1){
                        printstr += '%lf';
                        variablestr += ',' + (element.split(' ')[1]).substring(0, element.length - 1);
                    }else{
                        console.log('You need variable type');
                    }
                }else{
                    printstr += element.substring(0, element.length);
                }               
            });
            if(checkvar){return 'printf("' + printstr + '"' + variablestr + ');';}
            else{return 'printf("' + printstr + '"' + ');';} 
    },
    Ccomment: function(a){
        return '//'+a;
    },
    Cplus: function(a, b){
        return a + '+' + b;
    },
    Cminus: function(a, b){
        return a + '-' + b;
    },
    Cmultiplication: function(a, b){
        return a + '*' + b;
    },
    Cdivision: function(a, b){
        return a + '/' + b;
    },
    Cremainder: function(a, b){
        return a + '%' + b;
    },
    Cshift: function(a, b){
        return a + b;
    },
    Cand: function(a, b){
        return a +'&&'+ b;
    },
    Cor: function(a, b){
        return a +'||'+ b;
    },
    Cnot: function(a){
        return '!'+a;
    },
    Cif: function(a){
        var string = '';
        if(a.length == 1){
            return 'if(' + a[0].split(',')[0] +'){\n' + a[0].split(',')[1] + '\n}'; 
        }else{
            for(var i= 1; i < a.length -1; i++){
                string += 'else if('+a[i].split(',')[0]+'){\n'+a[i].split(',')[1]+'\n}'
            }
            return 'if('+a[0].split(',')[0]+'){\n'+ a[0].split(',')[1]+'\n}'+string +'else{\n'+a[a.length -1].split(',')[1]+'\n}';
        }
    },
    Cwhile: function(a, b){
        var whiletext = '';
        b.forEach(element => {
            whiletext += element + '\n';
        });
        return 'while('+a+'){\n'+whiletext+'}';
    },
    Cfor: function(a, b, c, d){
        var fortext = '';
        d.forEach(element => {
            fortext += element + '\n';
        });
        return 'for(int i ='+a+'; i < '+b+'; i'+c+'){\n'+fortext+'\n}';
    },
    Cdowhile: function(a, b){
        var whiletext = '';
        b.forEach(element => {
            whiletext += element + '\n';
        });
        return 'do{\n'+whiletext+'\n}while('+a+');';
    },
    Cscan: function(a){
        var printstr = '';
        var variablestr = '';
        a.forEach(element => {
                    if(element.indexOf('int') != -1){
                        printstr += '%d';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('float') != -1){
                        printstr += '%f';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('short') != -1){
                        printstr += '%hd';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('unsigned long') != -1){
                        printstr += '%ld';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('long long') != -1){
                        printstr += '%lld';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('long') != -1){
                        printstr += '%lu';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('char') != -1){
                        printstr += '%c';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }else if(element.indexOf('double') != -1){
                        printstr += '%lf';
                        variablestr += ',' + (element.split(' ')[1]).substring(0,  element.length - 1);
                    }              
            });
            return 'scanf("' + printstr + '"' + variablestr + ');';

    },
    Ps: function(b, c){
        return b + ' = ' + c;
    },
    Pplus: function(a, b){
        return a + '+' + b;
    },
    Pminus: function(a, b){
        return a + '-' + b
    },
    Pmul: function(a, b){
        return a + '*' + b;
    },
    Pdiv: function(a, b){
        return a + '/' + b;
    },
    Preminder: function(a, b){
        return a + '%' + b;
    },
    Psquare: function(a, b){
        return a + '**' + b;
    },
    Pshare: function(a, b){
        return a + '//' + b;
    },
    Plen: function(a){
        return 'len(' + a + ')';
    },
    Pindexing: function(a, b){
       if(b.indexOf('마지막부터') != -1  || b.indexOf('뒤에서부터') != -1){
           return a+'[-'+b.split(' ')[1]+']';
       }else if(b.indexOf('마지막') != -1 || b.indexOf('끝') != -1  ||  b.indexOf('뒤') != -1){
        return a+'[-1]';
       }
        return a+'['+b+']';
    },
    Pslicing: function(a, b, c){
        if((c.indexOf('마지막') != -1  || c.indexOf('뒤') != -1) && (b.indexOf('처음') != -1  || b.indexOf('시작') != -1) ){
            return a+'[:]';
        }else if(c.indexOf('마지막') != -1  || c.indexOf('뒤') != -1){
            return a+'['+b+':]';
        }else if(b.indexOf('처음') != -1  || b.indexOf('시작') != -1){
            return a+'[:'+c+']';
        }else{
            return a+'['+b+':'+c+']';
        }
    },
    Pcount: function(a, b){
        return a+'.count('+b+')';
    },
    Pfind: function(a, b){
        return a+'.find('+b+')' + ' 혹은 ' + a+'.index('+b+')';
    },
    Pjoin: function(a, b){
        return a+'.join('+b+')'; 
    },
    Pupper: function(a){
        return a+'.upper()';
    },
    Plower: function(a){
        return a+'.lower()';
    },
    Pstrip: function(a, b){
        if(b.indexOf('왼') != -1 || b.indexOf('좌') != -1){
            return a+'.lstrip()';
        }else if(b.indexOf('오른') != -1 || b.indexOf('우') != -1){
            return a+'.rstrip()';
        }else{
            return a+'.strip()';
        }
    },
    Preplace: function(a, b, c){
        return a+'.replace('+b+', '+c+')';
    },
    Psplit: function(a, b){
        return a+'.split('+b+')';
    },
    Pappend: function(a, b){
        return a+'.append('+b+')';
    },
    Psort: function(a){
        return a+'.sort()';
    },
    Preverse: function(a){
        return a+'.reverse())';
    },
    Pinsert: function(a, b, c){
        return a+'.insert('+b+', '+c+')';
    },
    Premove: function(a, b){
        return a+'.remove('+b+')';
    },
    Ppop: function(a, b){
        return a+'.pop('+b+')';
    },
    Pextend: function(a, b){
        return a+'.extend('+b+')';
    },
    Pprint: function(a){
        var pr = ''
        for(var i=0; i < a.length-1; i++){
            pr += a[i] + ' + '
        }
        return 'print('+pr+a[a.length -1]+')';
    },
    Pinput: function(a){
        return 'input('+a+')';
    },
    Pif: function(a){
        var string = '';
        if(a.length == 1){
            return 'if ' + a[0].split(',')[0] +':\n' +'    '+ a[0].split(',')[1]; 
        }else{
            for(var i= 1; i < a.length -1; i++){
                string += 'elif '+a[i].split(',')[0]+':\n'+'   '+a[i].split(',')[1] + '\n';
            }
            return 'if '+a[0].split(',')[0]+':\n'+'    '+ a[0].split(',')[1]+'\n'+string +'else:\n'+'   '+a[a.length -1].split(',')[1];
        }
    },
    Pfor: function(a, b, c){
        var fortext = '';
        c.forEach(element => {
            fortext += '    '+element + '\n';
        });
        return 'for ' + a + ' in ' + b +':\n' + fortext;
    },
    Pwhile: function(a, b){
        var whiletext = '';
        b.forEach(element => {
            whiletext += '  '+ element + '\n';
        });
        return 'while '+a+':\n'+whiletext;
    }    
}


module.exports = Ccode;
//module.exports = Pythoncode;



