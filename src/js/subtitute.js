import { getTable,parse } from './crazy-parser';
import Trow from './Trow';

function subti(toSub, code, paramsValues) {
    parse(toSub); // load the table var (poor engine)
    let table = getTable();
    let vars = genVarNames(table);
    let envs = rapidEval(initEnv(vars,paramsValues),table);

}

function initEnv(vars, inits){
    let map = {};
    for(let i = 0 ; i< inits.length ; i++){
        map[vars[i]] = inits[i];
    }
    return map;
}

// function rapidEval(basemap,table){
//     let envs = [];
//     envs.push(basemap);
//     envs.push(new Map(basemap));
//     table.forEach(trow=>{
//         let current = envs[envs.length];
//         if(parseInt(trow.line) === envs.length){
//             if(trow.type === 'variable declaration' || trow.type === 'assignment expression'){
//                 if(trow.value ===''){
//                     current[trow.name] = 'null';
//                 }
//                 else{
//                     current.keys().forEach(isthere =>{
//                         current[trow.name] = morphline(trow.value,isthere,current[isthere]);
//                     });
//                 }
//             }
//         }
//         else{
//             envs.push(new Map(current));
//         }
//     });
//     return envs;
// }

function morphline(line,varname, value){
    let start = line.indexOf(varname);
    let newline = '';
    while(start > -1){
        let end = start+varname.length;
        if(verifyValidPick(line,start,end - 1)){
            line = line.replace(varname,value);
        }
        newline +=line.substring(0,end);
        line = line.substring(end,line.length);
        start = line.indexOf(varname);
    }
    return newline+line;
}

function genVarNames(table) {
    let vars = [];
    table.forEach(row => {
        if (row.type === 'variable declaration' && !vars.includes(row.name)) {
            vars.push(row.name);
        }
    });
    return vars;
}

function verifyValidPick(line, start, end) {
    let re = new RegExp('([a-zA-Z0-9])');
    if (start > 0 && re.test(line[start-1])) {
        return false;
    }
    return !(end+1 < line.length - 1 && re.test(line[end+1]));

}


export {morphline};