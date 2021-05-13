const ul = document.getElementById('ul');
const li = document.createElement('li');
const a = document.createElement('a');
a.href = '1.html';
const img = document.createElement('img');
img.src = 'bookmark.png';
img.alt = 'ブックマーク';
a.textContent = 'これです';
// メモ：insertBeforeでも動くけどprependが記述量減って良い！
a.insertBefore(img, a.firstChild);
// a.prepend(img);※IE非対応
li.appendChild(a);
ul.appendChild(li);