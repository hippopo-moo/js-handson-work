const main = document.getElementsByTagName('main')[0];
const ul = document.getElementById('ul');
const fragment = document.createDocumentFragment();
const url = 'https://jsondata.okiba.me/v1/json/YwwDG210615121114';

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

const createList = async (listData)=> {
  Object.keys(listData.data).forEach( key => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = listData.data[key].text;
    a.href = listData.data[key].a;
    const img = document.createElement('img');
    img.src = listData.data[key].img;
    img.alt = listData.data[key].alt;
    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
  });
  ul.appendChild(fragment);
}

const init = async () => {
  createLoadingImage();
  const response = await getListData();
  const listData = await response.json();
  createList(listData);
  removeLoadingImage();
}

init();