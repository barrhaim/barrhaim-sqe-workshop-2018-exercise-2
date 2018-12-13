import {genEnv} from './envmake';
import {parse, getTableAndRefresh} from './crazy-parser';

function sub(ast, code) {
    let envs = {};
    genEnv(ast, envs, {});
    envs = filterZeros(envs);
    let functionParams = extractParams(ast);
    let filterdLinesArray = removeMeaninglessAssignments(ast, code, functionParams);
    let afterSubti = subtitueHelper(filterdLinesArray, envs);
    let newCode = myJoin(afterSubti);
    return newCode.replaceAll('\n', '</br>').replaceAll(' ', '&nbsp').replaceAll('    ', '&nbsp&nbsp&nbsp');
}

function subForColor(ast,code){
    let envs = {};
    genEnv(ast, envs, {});
    envs = filterZeros(envs);
    let functionParams = extractParams(ast);
    let filterdLinesArray = removeMeaninglessAssignments(ast, code, functionParams);
    return subtitueHelper(filterdLinesArray, envs);

}

function mark(ast, code, input) {
    let envs = {};
    let e = eval(input);
    genEnv(ast, envs, {}, e);
    parse(ast);
    let table = getTableAndRefresh();
    let colors = getLinesColor(table,envs);
    let subcode = subForColor(ast,code);
    return myJoin(paint(subcode,colors)).replaceAll('\n','<br/>');
}
function paint(code,colors){
    Object.keys(colors).forEach(key=>{
        let mykey = parseInt(key);
        if(colors[key]===true){
            code[mykey-1] = '<mark style="background-color: green">'+code[mykey-1]+'</mark>';
        }
        else{
            code[mykey-1] = '<mark style="background-color: red">'+code[mykey-1]+'</mark>';
        }

    });
    return code;

}

function getLinesColor(table, envs) {
    let marker = {};
    table.forEach(l => {
        if (l.condition !== '') {
            let linearray = [l.condition];
            let envOfLine = envs[l.line];
            let hybird = linearray.concat(Object.keys(envOfLine));
            let con ='';
            let newcond ='1';
            while(con !== newcond){
                con = newcond;
                newcond = hybird.reduce((acc, v) => morphline(acc, v, envOfLine[v]));
                hybird = [newcond].concat(Object.keys(envOfLine));
            }
            marker[l.line] = eval(newcond);
        }
    });
    return marker;
}

function subtitueHelper(lines, envs) {
    for (let i = 0; i < lines.length; i++) {
        let envOfLine = envs[i + 1];
        if (envOfLine !== undefined) {
            let linearray = [lines[i]];
            let hybird = linearray.concat(Object.keys(envOfLine));
            let before = '';
            while(before !== lines[i]){
                before = lines[i];
                lines[i] = hybird.reduce((acc, v) => morphline(acc, v, envOfLine[v]));
                hybird = [lines[i]].concat(Object.keys(envOfLine));
            }

        }
    }
    return lines;
}

function toDelete(table, i, lines) {
    let bool = (table[i].type === 'variable declaration' || table[i].type === 'assignment expression')
        && lines[table[i].line -1].indexOf('function') < 0 ;
    return bool;
}

function removeMeaninglessAssignments(ast, code, functionParams) {
    parse(ast);
    let table = getTableAndRefresh();
    let lines = code.split('\n');
    for (let i = 0; i < table.length; i++) {
        if (toDelete(table, i, lines)) {
            if (functionParams.indexOf(table[i].name)===-1) {
                lines[table[i].line - 1] = '';
            }
        }
    }
    return lines;


}

function myJoin(lines) {
    return [''].concat(lines).reduce((acc, l) => {
        return l === '' ? acc : acc.concat(l + '\n');
    });
}

// function killLetLine(line){
//     return line.indexOf('let')!==-1 ? '' : line;
// }
// function killParamLine(line,params){
//     let rightside = line;
//     while(rightside.indexOf('=')>=0){
//         rightside = rightside.substring(0,rightside.indexOf('=='));
//     }
//     rightside =line.substring(0,line.indexOf('='));
//     for(let i = 0 ; i < params.length; i++){
//         if(rightside.indexOf(params[i])!==-1){
//             return '';
//         }
//     }
// }
// function cutEquation(line){
//     let r = new RegExp('>|<|=|!');
//
// }

function extractParams(ast) {
    if ('FunctionDeclaration' === ast.type) {
        return paramsSlayer(ast.params);
    }
    else if ('body' in ast) {
        if (Array.isArray(ast.body)) {
            for (let i = 0; i < ast.body.length; i++) {
                return extractParams(ast.body[i]);
            }
        }
        else {
            return extractParams(ast.body);
        }
    }
}

function paramsSlayer(ast) {
    return ast.map(p => p.name);
}

function morphline(line, varname, value) {
    let start = line.indexOf(varname);
    let newline = '';
    while (start > -1) {
        let end = start + varname.length;
        if (verifyValidPick(line, start, end - 1)) {

            if(line[end+1] === '*' || line[end+1] ==='/'){
                line = line.replace(varname, '('+value+')');
            }
            else {
                line = line.replace(varname, value);
            }
        }
        newline += line.substring(0, end);
        line = line.substring(end, line.length);
        start = line.indexOf(varname);
    }
    return newline + line;
}


function verifyValidPick(line, start, end) {
    let re = new RegExp('([a-zA-Z0-9])');
    if (start > 0 && re.test(line[start - 1])) {
        return false;
    }
    return !(end + 1 < line.length - 1 && re.test(line[end + 1])) && nextCharNotEq(line,end);

}

function nextCharNotEq(line, start){
    for(let i = start + 1 ; i < line.length ; i++){
        if(line[i]!==' '&& line[i] !=='  ') {
            if(line[i] === '=' && eqclose(line,i)){
                return true;
            }
            else if(line[i] === '='){
                return false;
            }
            return true;
        }
    }
    return true;
}

function eqclose(line, start){
    for(let i = start + 1 ; i < line.length ; i++){
        if(line[i]!==' '&& line[i] !=='  ') {
            if(line[i] === '='){
                return true;
            }
            return false;
        }
    }
    return false;
}

function filterZeros(envs) {
    Object.keys(envs).forEach(key => {
        Object.keys(envs[key]).forEach(s => {
            let envElement = envs[key][s];
            envs[key][s] = replacer(envElement);
        });
    });
    return envs;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function replacer(string) {
    return string.replaceAll('+0', '').replaceAll('-0', '').replaceAll('0+', '').replaceAll('0-', '-');
}


export {morphline, sub, mark};