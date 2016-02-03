'use strict';

const saveButton = document.querySelector('button');
const taigaUrlInput = document.querySelector('[name=taigaUrl]');

console.log('options');
console.log(saveButton, taigaUrlInput);

chrome.storage.sync.get({taigaUrl: ''}, (items) => {
  taigaUrlInput.value = items.taigaUrl;
});

saveButton.addEventListener('click', () => {
  console.log('click');
  chrome.storage.sync.set({
    taigaUrl: taigaUrlInput.value
  });
});