import {morphline} from './subtitute';



function genEnv(ast, envs, baseEnv,input) {
    let envfunc = {
        'FunctionDeclaration': functionDeclarationEnv,
        'VariableDeclaration': VariableDeclarationEnv,
        'VariableDeclarator': variableDeclaratorEnv,
        'AssignmentExpression': assignmentExpressionEnv,
        'WhileStatement': whileStatementEnv,
        'IfStatement': ifStatementEnv,
        'ExpressionStatement':expressionStatement,
        'ReturnStatement':returnStatement
    };
    if(input!==undefined && ast.type ==='FunctionDeclaration'){
        functionDeclarationEnv(ast,envs,baseEnv,input);
    }else{
        ast.type in envfunc ? envfunc[ast.type](ast, envs, baseEnv,input) : bodyEnv(ast, envs, baseEnv,input);
    }

}


function returnStatement(ast, envs, baseEnv, input) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    genEnv(ast.argument,envs,baseEnv,input);
}
function expressionStatement(ast, envs, baseEnv,input) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    genEnv(ast.expression,envs,baseEnv,input);
}
function VariableDeclarationEnv(ast, envs, baseEnv,input) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    ast.declarations.forEach(dec => {
        genEnv(dec, envs, baseEnv,input);
    });
}

function variableDeclaratorEnv(ast, envs, baseEnv,input) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    let currentmap = envs[ast.loc.start.line];
    let val = ast.init === null ?
        makeItRight(currentmap, 'null') : makeItRight(currentmap, binaryExpressionToString(ast.init));
    currentmap[ast.id.name] = val;
    baseEnv[ast.id.name] = val;
}

function assignmentExpressionEnv(ast, envs, baseEnv,input) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    let currentmap = envs[ast.loc.start.line];
    let val = makeItRight(currentmap, binaryExpressionToString(ast.right));
    currentmap[ast.left.name] = val;
    baseEnv[ast.left.name] = val;
}


function whileStatementEnv(ast, envs) {

}

function ifStatementEnv(ast, envs ,baseEnv,input) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    genEnv(ast.consequent,envs,copyMap(baseEnv));
    if(ast.alternate!==null){
        genEnv(ast.alternate,envs,copyMap(baseEnv));
    }
}

function functionDeclarationEnv(ast, envs, baseEnv, input) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    let current = envs[ast.loc.start.line];
    if(input!==undefined){
        let i =0;
        ast.params.forEach(param => {
            current[param.name] = input[i];
            baseEnv[param.name] = input[i];
            i=i+1;
        });

    }else{
        ast.params.forEach(param => {
            current[param.name] = param.name;
            baseEnv[param.name] = param.name;
        });
    }
    genEnv(ast.body, envs, copyMap(current),input);

}

function bodyEnv(ast, envs, baseEnv,input) {
    if ('body' in ast) {
        if (Array.isArray(ast.body)) {
            ast.body.forEach(body => {
                genEnv(body, envs, baseEnv,input);
            });
        }
        else {
            genEnv(ast.body, envs, baseEnv,input);
        }
    }
}

function makeItRight(env, expression) {
    let strings = Object.keys(env);
    return [expression].concat(strings).reduce((acc, v) => {
        return morphline(''+acc, v, ''+env[v]);
    });
}

function makeEnv(envs, baseEnv, line) {
    if (!(line in envs)) {
        envs[line] = copyMap(baseEnv);
    }
}

function copyMap(old) {
    let map = {};
    Object.keys(old).forEach(key => {
        map[key] = old[key];
    });
    return map;
}


function binaryExpressionToString(toParse) {
    switch (toParse['type']) {
    case 'Identifier':
        return toParse['name'];
    case 'Literal':
        return toParse['value'];
    case 'MemberExpression':
        return toParse['object']['name'] + `[${binaryExpressionToString(toParse['property'])}]`;
    case 'UnaryExpression':
        return (
            toParse['operator'] + binaryExpressionToString(toParse['argument'])
        );
    default:
        return handleBinary(toParse);
    }
}

function handleBinary(toParse) {
    let mymap = {
        '&': '&amp',
        '&&': '&amp&amp',
        '<': '&lt',
        '>': '&gt'
    };
    let op = toParse['operator'];
    return (
        binaryExpressionToString(toParse['left']) +
        (op in mymap ? mymap[op] : op) +
        binaryExpressionToString(toParse['right'])
    );
}

export {genEnv};