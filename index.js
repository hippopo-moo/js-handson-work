const ul = document.getElementById('ul');

// liタグを作成
const listItem = document.createElement('li');
// aタグを作成
const anker = document.createElement('a');
// aタグに属性追加
anker.setAttribute('href','1.html');
// imgタグを作成
const img = document.createElement('img');
// imgタグに属性追加
img.setAttribute('src','bookmark.png');
img.setAttribute('alt','ブックマーク');

// imgタグをaタグの子要素として挿入
anker.innerText = 'これです';
anker.insertBefore(img, anker.firstChild);

// aタグをliタグの子要素として挿入
listItem.appendChild(anker);

// ulの子要素としてliタグを挿入
ul.appendChild(listItem);