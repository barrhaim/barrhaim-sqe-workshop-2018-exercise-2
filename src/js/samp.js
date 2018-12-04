
function morphline(line,varname){
    let start = line.indexOf(varname);
    let newline = "";
    while(start > -1){
        let end = start+varname.length;
        if(verifyValidPick(line,start,end - 1)){
            line = line.replace(varname,"MUAH");
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


function rapidEval(basemap,table){
    let envs = [];
    envs.push(basemap);
    envs.push(new Map(basemap));
    table.forEach(trow=>{
        if(trow.line == envs.length){

        }
    });
}


