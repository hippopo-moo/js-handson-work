const ul = document.getElementById('ul');

const listData = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

listData.forEach(data => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.textContent = data.text;
  a.href = data.to;
  const img = document.createElement('img');
  img.src = data.img;
  img.alt = data.alt;
  a.insertBefore(img, a.firstChild);
  li.appendChild(a);
  ul.appendChild(li);
});
