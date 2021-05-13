const ul = document.getElementById('ul');

// これは連想配列？
const listData = {
  data1: {
    href:'1.html',
    src:'/img/bookmark.png',
    text:'a1'
  },
  data2: {
    href:'2.html',
    src:'/img/bookmark.png',
    text:'a2'
  }
}

Object.keys(listData).forEach((key)=>{
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.textContent = listData[key].text;
  a.href = listData[key].href;
  const img = document.createElement('img');
  img.src = listData[key].src;
  a.insertBefore(img, a.firstChild);
  li.appendChild(a);
  ul.appendChild(li);
})