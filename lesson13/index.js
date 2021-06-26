const main = document.getElementsByTagName('main')[0];
const ul = document.createElement('ul');

const url = 'https://jsondata.okiba.me/v1/json/xL3LX210624191849';
const fetchBtn = document.getElementById("js-btn-fetch"); 
const modal = document.getElementById("js-modal");
const modalBody = document.getElementById("js-modal-body");
const modalOverlay = document.getElementById("js-modal-overlay");

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

const createList = async ({data}) => {
  clearList();
  const fetchedData = data;
  const fragment = document.createDocumentFragment();
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

const clearList = () => {
  ul.innerHTML = "";
}

const appendToModal = () => {
  modalBody.appendChild(ul);
}

const showModal = () => {
  modal.classList.add("is-show");
}

const init = async () => {
  createLoadingImage();
  const response = await getListData();
  const listData = await response.json();
  removeLoadingImage();
  createList(listData);
  appendToModal();
  showModal();
}

fetchBtn.addEventListener("click", () => {
  init();
});

modalOverlay.addEventListener( "click", () => {
  modal.classList.remove("is-show");
})