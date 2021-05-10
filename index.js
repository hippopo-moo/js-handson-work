// ul要素を取得
const ul = document.getElementById('ul');

// liタグを作成
const listItem = document.createElement('li');

// liタグにテキストを挿入
listItem.textContent = 'これです';
console.log(listItem);

// ulの子要素としてliタグを挿入
ul.appendChild(listItem);