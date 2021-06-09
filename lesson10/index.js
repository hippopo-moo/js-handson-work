const main = document.getElementsByTagName('main')[0];
const ul = document.getElementById('ul');
const fragment = document.createDocumentFragment();
const fragmentLoadingImage = document.createDocumentFragment();
const div = document.createElement('div');
div.id = "loading"
const img = document.createElement('img');
img.src = "./loading-circle.gif";
fragmentLoadingImage.appendChild(div).appendChild(img)

const list = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]
// const loadingImage = document.getElementById("loading");

const getListData = () => {
  return new Promise((resolve)=> {
    try {
      setTimeout(() => {
        resolve(list);
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      console.log('finally句内です');
    }
  });
}

const createList = async ()=> {
  main.appendChild(fragmentLoadingImage);
  const listData = await getListData();
  listData.forEach( listDataItem => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = listDataItem.text;
    a.href = listDataItem.to;
    const img = document.createElement('img');
    img.src = listDataItem.img;
    img.alt = listDataItem.alt;
    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
  });
  main.removeChild(document.getElementById('loading'));
  ul.appendChild(fragment);
}
createList();