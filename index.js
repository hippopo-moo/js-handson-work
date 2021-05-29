const ul = document.getElementById('ul');
const fragment = document.createDocumentFragment();
const listData = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]
const loadingImage = document.getElementById("loading");

const getListData = ()=>{
  return new Promise(function(resolve, reject){
    try {
      resolve(listData);
    } catch (error) {
      reject('error') 
    }
  })
}

const createList = ()=> {
  getListData()
  .then((data)=>{
    console.log('loadingImage'+loadingImage);
    loadingImage.style.display = 'none';
    listData.forEach(data => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = data.text;
      a.href = data.to;
      const img = document.createElement('img');
      img.src = data.img;
      img.alt = data.alt;
      fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
    });
    ul.appendChild(fragment);
  })
  .catch((error)=>{
    console.log(error);
  })
}
createList();