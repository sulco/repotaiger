'use strict';

const linkTypes = [
    {pattern: new RegExp('(#t)(\\d+)', 'g'), urlpart: 'task'},
    {pattern: new RegExp('(#u)(\\d+)', 'g'), urlpart: 'us'},
    {pattern: new RegExp('(#i)(\\d+)', 'g'), urlpart: 'issue'}
];

var taigaUrl;

chrome.storage.sync.get({taigaUrl: ''}, items => {
    taigaUrl = items.taigaUrl;
    if (taigaUrl.slice(-1) !== '/') {
      taigaUrl = taigaUrl + '/';
    }
    init();
});

function init() {
    Array.from(document.querySelectorAll('.description *, .pull-request-title h1'))
        .filter(node =>
            !node.querySelectorAll('*').length)
        .forEach(node =>
            node.innerHTML = taigaize(node.textContent));
}

function taigaize(text) {
    return linkTypes
        .reduce((acc, type) =>
            acc.replace(type.pattern, `<a href="${taigaUrl}${type.urlpart}/$2">$1$2</a>`)
        , text);
}
