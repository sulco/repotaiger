'use strict';

var linkTypes = [
    {pattern: new RegExp('(#t)(\\d+)', 'g'), urlpart: 'task'},
    {pattern: new RegExp('(#u)(\\d+)', 'g'), urlpart: 'us'},
    {pattern: new RegExp('(#i)(\\d+)', 'g'), urlpart: 'issue'}
];

Array.from(document.querySelectorAll('.description *, .pull-request-title h1'))
    .filter(function(node) {return !node.querySelectorAll('*').length})
    .forEach(function(node) {node.innerHTML = taigaize(node.textContent)})

function taigaize(text) {
    return linkTypes
        .reduce(function(acc, type) {
            return acc.replace(type.pattern, `<a href="https://taiga.crossengage.io/project/chiarabroggi-development/${type.urlpart}/$2">$1$2</a>`)
        }, text);
}
