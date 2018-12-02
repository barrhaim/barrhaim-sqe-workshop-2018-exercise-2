import $ from 'jquery';
import { myParseCode } from './code-analyzer';
import { parse } from './crazy-parser';
$(document).ready(function() {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = myParseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        $('#mydiv').html(() => {
            return (
                '<table class=\'table\'><tr><th>Line</th><th>Type</th><th>Name</th><th>condition</th><th>Value</th></tr>' +
        parse(parsedCode) +
        '</table>'
            );
        });
    });
});
