import assert from 'assert';
import { parseCode, myParseCode } from '../src/js/code-analyzer';
import { parse , getTableAndRefresh } from '../src/js/crazy-parser';
import Trow from '../src/js/Trow';
var constants = require('../src/js/constants');
import {sub,mark} from '../src/js/subtitute';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script"}'
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":1,"raw":"1"}}],"kind":"let"}],"sourceType":"script"}'
        );
    });
});

// ///////////////////////////////////////////////////////////
describe('Test For statement', () => {
    it('parse for loop empty body', () => {
        let res = [
            new Trow('1', 'for statement', '', 'i<6', '').toHtml(),
            new Trow('1', 'variable declaration', 'i', '', '0').toHtml()
        ].join('');
        assert.equal(pipline('for(let i = 0 ; i < 6 ; i++){}'), res);
    });
    it('parse for loop with body', () => {
        let res = [
            new Trow('1', 'for statement', '', 'i<6', '').toHtml(),
            new Trow('1', 'variable declaration', 'i', '', '0').toHtml(),
            new Trow('2', 'assignment expression', 'i', '', 'i+5').toHtml()
        ].join('');
        assert.equal(pipline('for(let i = 0 ; i < 6 ; i++)\n{i = i + 5;}'), res);
    });
});
//
describe('Test while statement', () => {
    it('parse while empty body', () => {
        let res = [new Trow('1', 'while statement', '', 'x==8', '').toHtml()].join(
            ''
        );
        assert.equal(res, pipline('while(x==8)\n{}'));
    });

    it('parse while with body', () => {
        let res = [
            new Trow('1', 'while statement', '', 'x<8|x>3', '').toHtml(),
            new Trow('2', 'variable declaration', 'k', '', 'i+5').toHtml()
        ].join('');
        assert.equal(pipline('while(x<8|x>3)\n{let k = i + 5;}'), res);
    });
});

describe('Test if statement', () => {
    it('parse if empty body', () => {
        let res = [new Trow('1', 'if statement', '', 'arr[i]>11', '').toHtml()].join('');
        assert.equal(res, pipline('if(arr[i] > 11)\n{}'));
    });
    it('parse if with body', () => {
        let res = [
            new Trow('1', 'if statement', '', 'arr[i]>11', '').toHtml(), new Trow('2', 'assignment expression', 'x', '', 'x+1').toHtml(), new Trow('3', 'assignment expression', 'p', '', 'k').toHtml()].join('');
        assert.equal(pipline('if(arr[i] > 11)\n{x = x + 1;\np=k;}'), res);
    });
    it('parse if else', () => {
        let res = [new Trow('1', 'if statement', '', 'arr[i]>11', '').toHtml(), new Trow('2', 'assignment expression', 'x', '', 'x+1').toHtml(), new Trow('3', 'else statement', '', '', '').toHtml(), new Trow('4', 'assignment expression', 'a[l]', '', '1').toHtml()].join('');
        assert.equal(pipline('if(arr[i] > 11)\n{x = x + 1;}\nelse\n{a[l] = 1;}'), res);
    });
    it('parse if else if else', () => {
        let res = [new Trow('1', 'if statement', '', 'arr[i]>11', '').toHtml(), new Trow('2', 'assignment expression', 'x', '', 'x+1').toHtml(), new Trow('3', 'else if statement', '', 'k', '').toHtml(), new Trow('3', 'assignment expression', 'p', '', 'p+2').toHtml(), new Trow('4', 'else statement', '', '', '').toHtml(), new Trow('5', 'assignment expression', 'a[l]', '', '1').toHtml()
        ].join('');
        assert.equal(pipline('if(arr[i] > 11)\n{x = x + 1}\nelse if(k){p=p+2}\nelse\n{a[l] = 1}'), res);
    });
});

describe('Test return statement', () => {
    it('parse return statement', () => {
        let res = [
            new Trow('1', 'function declaration', 'ret', '', '').toHtml(),
            new Trow('2', 'return statement', '', '', 'x==0').toHtml()
        ].join('');
        assert.equal(res, pipline('function ret(){\nreturn x==0;}'));
    });

    it('parse return unary', () => {
        let res = [
            new Trow('1', 'function declaration', 'ret', '', '').toHtml(),
            new Trow('2', 'return statement', '', '', '-1').toHtml()
        ].join('');
        assert.equal(res, pipline('function ret(){\nreturn -1;}'));
    });
});

describe('Test variable declaration', () => {
    it('parse complex var dec', () => {
        let res = [
            new Trow('1', 'variable declaration', 'x', '', '7+5*2').toHtml()
        ].join('');
        assert.equal(res, pipline('let x = 7+5*2;'));
    });

    it('parse unary var dec', () => {
        let res = [
            new Trow('1', 'variable declaration', 'x', '', '+7').toHtml()
        ].join('');
        assert.equal(res, pipline('let x = +7;'));
    });
});

describe('Test assignment statement', () => {
    it('parse complex var dec', () => {
        let res = [
            new Trow('1', 'assignment expression', 'x', '', '7+5*2').toHtml()
        ].join('');
        assert.equal(res, pipline('x = 7+5*2;'));
    });

    it('parse unary var dec', () => {
        let res = [
            new Trow('1', 'assignment expression', 'x', '', 'y').toHtml()
        ].join('');
        assert.equal(res, pipline('x = y;'));
    });
});

describe('Test github code ', () => {
    it('parse github code example', () => {
        assert.equal(
            parse(constants.jcode1),
            '<tr><td>1</td><td>function declaration</td><td>binarySearch</td><td></td><td></td></tr><tr><td>1</td><td>variable declaration</td><td>X</td><td></td><td></td></tr><tr><td>1</td><td>variable declaration</td><td>V</td><td></td><td></td></tr><tr><td>1</td><td>variable declaration</td><td>n</td><td></td><td></td></tr><tr><td>2</td><td>variable declaration</td><td>low</td><td></td><td></td></tr><tr><td>2</td><td>variable declaration</td><td>high</td><td></td><td></td></tr><tr><td>2</td><td>variable declaration</td><td>mid</td><td></td><td></td></tr><tr><td>3</td><td>assignment expression</td><td>low</td><td></td><td>0</td></tr><tr><td>4</td><td>assignment expression</td><td>high</td><td></td><td>n-1</td></tr><tr><td>5</td><td>while statement</td><td></td><td>low<=high</td><td></td></tr><tr><td>6</td><td>assignment expression</td><td>mid</td><td></td><td>low+high/2</td></tr><tr><td>7</td><td>if statement</td><td></td><td>X<V[mid]</td><td></td></tr><tr><td>8</td><td>assignment expression</td><td>high</td><td></td><td>mid-1</td></tr><tr><td>9</td><td>else if statement</td><td></td><td>X>V[mid]</td><td></td></tr><tr><td>10</td><td>assignment expression</td><td>low</td><td></td><td>mid+1</td></tr><tr><td>11</td><td>else statement</td><td></td><td></td><td></td></tr><tr><td>12</td><td>return statement</td><td></td><td></td><td>mid</td></tr><tr><td>14</td><td>return statement</td><td></td><td></td><td>-1</td></tr>'
        );
    });
    it('empty crap', () => {
        assert.equal('', pipline('a[i]'));
    });
});

describe('Test github code ', () => {
    it('sub while code', () => {
        getTableAndRefresh();
        let code ='function foo(x, y, z){ \n let a = x + 1; \n let b = a + y; \n let c = 0; \n \n while (a < z) { \n c = a + b;\n z = c * 2;\n } \n return z; \n }';
        let ast = myParseCode(code);
        let  ans = sub(ast,code);
        assert.equal(ans , 'function&nbspfoo(x,&nbspy,&nbspz){&nbsp</br>&nbsp</br>&nbspwhile&nbsp(x+1&nbsp<&nbspz)&nbsp{&nbsp</br>&nbspz&nbsp=&nbsp(x+1+x+1+y)&nbsp*&nbsp2;</br>&nbsp}&nbsp</br>&nbspreturn&nbspz;&nbsp</br>&nbsp}</br>');
    });
});

describe('Test github code 2 ', () => {
    it('sub first example', () => {
        getTableAndRefresh();
        let code ='function foo(x, y, z){\n' + '    let a = x + 1;\n' + '    let b = a + y;\n' + '    let c = 0;\n' + '    \n' + '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}\n';
        let ast = myParseCode(code);
        let  ans = sub(ast,code);
        assert.equal(ans,'function&nbspfoo(x,&nbspy,&nbspz){</br>&nbsp&nbsp&nbsp&nbsp</br>&nbsp&nbsp&nbsp&nbspif&nbsp(x+1+y&nbsp<&nbspz)&nbsp{</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspreturn&nbspx&nbsp+&nbspy&nbsp+&nbspz&nbsp+&nbsp5;</br>&nbsp&nbsp&nbsp&nbsp}&nbspelse&nbspif&nbsp(x+1+y&nbsp<&nbsp(z)&nbsp*&nbsp2)&nbsp{</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspreturn&nbspx&nbsp+&nbspy&nbsp+&nbspz&nbsp+&nbspx+5;</br>&nbsp&nbsp&nbsp&nbsp}&nbspelse&nbsp{</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspreturn&nbspx&nbsp+&nbspy&nbsp+&nbspz&nbsp+&nbspz+5;</br>&nbsp&nbsp&nbsp&nbsp}</br>}</br>');
    });
});

describe('mark github code 1 ', () => {
    it('mark while code', () => {
        getTableAndRefresh();

        let code ='function foo(x, y, z){ \n let a = x + 1; \n let b = a + y; \n let c = 0; \n \n while (a < z) { \n c = a + b;\n z = c * 2;\n } \n return z; \n }';
        let cmp = 'function foo(x, y, z){ <br/> <br/><mark style="background-color: green"> while (x+1 < z) { </mark><br/> z = (x+1+x+1+y) * 2;<br/> } <br/> return z; <br/> }<br/>';
        let ast = myParseCode(code);
        let  ans = mark(ast,code,['1','2','3']);
        assert.equal(cmp,ans);
    });
});

describe('mark github code 2 ', () => {
    it('mark other code', () => {
        getTableAndRefresh();

        let code ='function foo(x, y, z){\n' + '    let a = x + 1;\n' + '    let b = a + y;\n' + '    let c = 0;\n' + '    \n' + '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}\n';
        let cmp = 'function foo(x, y, z){<br/>    <br/><mark style="background-color: red">    if (x+1+y < z) {</mark><br/>        return x + y + z + 5;<br/><mark style="background-color: green">    } else if (x+1+y < (z) * 2) {</mark><br/>        return x + y + z + x+5;<br/>    } else {<br/>        return x + y + z + z+5;<br/>    }<br/>}<br/>';
        let ast = myParseCode(code);
        let  ans = mark(ast,code,['1','2','3']);
        assert.equal(cmp,ans);
    });
});
function pipline(string) {
    return parse(myParseCode(string));
}

