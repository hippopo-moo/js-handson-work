const ul = document.getElementById('ul');
const li = document.createElement('li');
const a = document.createElement('a');
a.href = '1.html';
const img = document.createElement('img');
img.src = 'bookmark.png';
img.alt = 'ブックマーク';
a.textContent = 'これです';
a.prepend(img);
// メモ：insertBeforeでも動くけどprependが記述量減って良い！
// a.insertBefore(img, a.firstChild);
li.appendChild(a);
ul.appendChild(li);