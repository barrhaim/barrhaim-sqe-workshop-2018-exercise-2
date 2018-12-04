import {morphline} from './subtitute';



function genEnv(ast, envs, baseEnv) {
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
    ast.type in envfunc ? envfunc[ast.type](ast, envs, baseEnv) : bodyEnv(ast, envs, baseEnv);
}


function returnStatement(ast, envs, baseEnv) {
    genEnv(ast.argument,envs,baseEnv);
}
function expressionStatement(ast, envs, baseEnv) {
    genEnv(ast.expression,envs,baseEnv);
}
function VariableDeclarationEnv(ast, envs, baseEnv) {
    ast.declarations.forEach(dec => {
        genEnv(dec, envs, baseEnv);
    });
}

function variableDeclaratorEnv(ast, envs, baseEnv) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    let currentmap = envs[ast.loc.start.line];
    let val = ast.init === null ?
        makeItRight(currentmap, 'null') : makeItRight(currentmap, binaryExpressionToString(ast.init));
    currentmap[ast.id.name] = val;
    baseEnv[ast.id.name] = val;
}

function assignmentExpressionEnv(ast, envs, baseEnv) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    let currentmap = envs[ast.loc.start.line];
    let val = makeItRight(currentmap, binaryExpressionToString(ast.right));
    currentmap[ast.left.name] = val;
    baseEnv[ast.left.name] = val;
}


function whileStatementEnv(ast, envs) {

}

function ifStatementEnv(ast, envs ,baseEnv) {
    genEnv(ast.consequent,envs,copyMap(baseEnv));
    if(ast.alternate!==null){
        genEnv(ast.alternate,envs,copyMap(baseEnv));
    }
}

function functionDeclarationEnv(ast, envs, baseEnv) {
    makeEnv(envs, baseEnv, ast.loc.start.line);
    let current = envs[ast.loc.start.line];
    ast.params.forEach(param => {
        current[param.name] = param.name;
        baseEnv[param.name] = param.name;
    });
    genEnv(ast.body, envs, copyMap(current));

}

function bodyEnv(ast, envs, baseEnv) {
    if ('body' in ast) {
        if (Array.isArray(ast.body)) {
            ast.body.forEach(body => {
                genEnv(body, envs, baseEnv);
            });
        }
        else {
            genEnv(ast.body, envs, baseEnv);
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