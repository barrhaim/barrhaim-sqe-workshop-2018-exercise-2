import $ from 'jquery';
import { myParseCode } from './code-analyzer';
import {sub,mark} from './subtitute';
$(document).ready(function() {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = myParseCode(codeToParse);
        let input = $('#parsedCode').val();
        $('#subdiv').html(() => {
            return '<lable>'+sub(parsedCode,codeToParse)+'</lable>';
        });
        $('#markdiv').html(() => {
            return mark(parsedCode,codeToParse,input);
        });


    });
});
