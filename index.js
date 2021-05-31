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
      setTimeout(() => {
        reject('error')
      }, 3000);
    } catch (error) {
    }
  })
}

const createList = ()=> {
  getListData()
  .then(()=>{
  })
  .catch((error)=>{
    console.error(error);
  })
}
createList();