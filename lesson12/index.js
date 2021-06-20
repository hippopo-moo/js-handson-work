const main = document.getElementsByTagName('main')[0];
const ul = document.getElementById('ul');
const fragment = document.createDocumentFragment();
const url = 'https://jsondata.okiba.me/v1/json/YwwDG210615121114';
const fetchBtn = document.getElementById("js-btn-fetch"); 

const createLoadingImage = () => {
  const fragmentLoadingImage = document.createDocumentFragment();
  const div = document.createElement('div');
  div.id = "loading"
  const img = document.createElement('img');
  img.src = "./loading-circle.gif";
  fragmentLoadingImage.appendChild(div).appendChild(img)
  main.appendChild(fragmentLoadingImage);
}

const removeLoadingImage = () => {
  main.removeChild(document.getElementById('loading'));
}

const getListData = () => {
  return new Promise((resolve)=> {
    try {
      resolve(fetch(url));
    } catch (error) {
      console.error(error);
    } finally {
      console.log('finally');
    }
  });
}

const createList = async ({data})=> {
  const fetchedData = data;
  fetchedData.forEach( element => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = element.text;
    a.href = element.a;
    const img = document.createElement('img');
    img.src = element.img;
    img.alt = element.alt;
    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
  });
  ul.appendChild(fragment);
}

const init = async () => {
  createLoadingImage();
  const response = await getListData();
  const listData = await response.json();
  removeLoadingImage();
  createList(listData);
}


fetchBtn.addEventListener("click",()=>{
  init();
});