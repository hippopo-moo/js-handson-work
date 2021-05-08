// ul要素を取得
const list = document.getElementById('list');

// liタグを作成
const listItem = document.createElement('li');

// liタグにテキストを挿入
listItem.innerHTML = 'これです';

// ulの子要素としてliタグを挿入
list.appendChild(listItem);