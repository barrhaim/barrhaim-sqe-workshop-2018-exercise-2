import Trow from './Trow';

function parseBody(toParse) {
    return ['']
        .concat(toParse['body'])
        .reduce((accumulator, currentValue) => accumulator + parse(currentValue));
}

function parseFunction(toParse) {
    let name = toParse['id']['name'];
    let type = 'function declaration';
    let line = toParse['loc']['start']['line'];

    return (
        template(line, type, name, '', '') +
        paramsSlayer(toParse['params']) +
        parse(toParse['body'])
    );
}

function paramsSlayer(listOfParams) {
    return ['']
        .concat(listOfParams)
        .reduce((accumulator, currentValue) => accumulator + parse(currentValue));
}

function parseIndentifer(toParse) {
    let name = toParse['name'];
    let type = 'variable declaration';
    let line = toParse['loc']['start']['line'];
    return template(line, type, name, '', '');
}

function parseVariableDeclaration(toParse) {
    return ['']
        .concat(toParse['declarations'])
        .reduce((accumulator, currentValue) => accumulator + parse(currentValue));
}

function parseVariableDeclarator(toParse) {
    let line = toParse['loc']['start']['line'];
    let type = 'variable declaration';
    let name = toParse['id']['name'];
    let value =
        toParse['init'] !== null ? binaryExpressionToString(toParse['init']) : '';
    return template(line, type, name, '', value);
}

function parseBlockStatement(toParse) {
    return parseBody(toParse);
}

function parseExpressionStatement(toParse) {
    return parse(toParse['expression']);
}

function parseAssignmentExpression(toParse) {
    let name = binaryExpressionToString(toParse['left']);
    let line = toParse['left']['loc']['start']['line'];
    let type = 'assignment expression';
    let value = binaryExpressionToString(toParse['right']);
    return template(line, type, name, '', value);
}

//& becomes &amp;
//< becomes &lt;
//> becomes &gt;
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
function handleBinary(toParse){
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

function parseWhileStatement(toParse) {
    let condition = binaryExpressionToString(toParse['test']);
    let type = 'while statement';
    let line = toParse['loc']['start']['line'];
    return template(line, type, '', condition, '') + parseBody(toParse);
}

function parseIfStatement(toParse, isFirst) {
    let condition = binaryExpressionToString(toParse['test']);
    let type = isFirst ? 'if statement' : 'else if statement';
    let line = toParse['loc']['start']['line'];
    return (
        template(line, type, '', condition, '') +
        parse(toParse['consequent']) +
        (toParse['alternate'] !== null &&
        toParse['alternate']['type'] !== 'IfStatement'
            ? template(
                toParse['alternate']['loc']['start']['line'] - 1, 'else statement', '',
                '',
                ''
            ) + parse(toParse['alternate'], false)
            : toParse['alternate'] !== null
                ? parse(toParse['alternate'], false)
                : '')
    );
}

function parseReturnStatement(toParse) {
    let type = 'return statement';
    let line = toParse['loc']['start']['line'];
    let value = binaryExpressionToString(toParse['argument']);
    return template(line, type, '', '', value);
}

function parseForStatement(toParse) {
    let condition = binaryExpressionToString(toParse['test']);
    let type = 'for statement';
    let line = toParse['loc']['start']['line'];
    return (
        template(line, type, '', condition, '') +
        parseVariableDeclaration(toParse['init']) +
        parseBody(toParse)
    );
}

function parseProgram(toParse) {
    return parseBody(toParse);
}

///////////////////////////////////////////////////////////////////////////////////////////
function template(line, type, name, condition, value) {
    return new Trow(line, type, name, condition, value).toHtml();
}

function ifWrapper(toParse, controlFlag) {
    return controlFlag === undefined
        ? parseIfStatement(toParse, true) // means its first if
        : parseIfStatement(toParse, controlFlag);

}

function parse(toParse, controlFlag) {
    let type = toParse['type'];
    let supermap = {
        'Program': parseProgram,
        'FunctionDeclaration': parseFunction,
        'VariableDeclaration': parseVariableDeclaration,
        'Identifier': parseIndentifer,
        'BlockStatement': parseBlockStatement,
        'VariableDeclarator': parseVariableDeclarator,
        'ExpressionStatement': parseExpressionStatement,
        'AssignmentExpression': parseAssignmentExpression,
        'WhileStatement': parseWhileStatement,
        'IfStatement': ifWrapper,
        'ReturnStatement': parseReturnStatement,
        'ForStatement': parseForStatement
    };
    return type !== 'IfStatement' && (type in supermap) ? supermap[type](toParse) :
        (type === 'IfStatement' ? supermap[type](toParse, controlFlag) : '');
}

export {parse};
