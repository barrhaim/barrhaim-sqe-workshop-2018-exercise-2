import * as esprima from 'esprima';
const myParseCode = codeToParse => {
    return esprima.parseScript(codeToParse, { loc: true });
};
const parseCode = codeToParse => {
    return esprima.parseScript(codeToParse);
};

export { parseCode, myParseCode };
