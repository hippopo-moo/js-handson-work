const main = document.getElementsByTagName('main')[0];
const ul = document.createElement('ul');
const url = 'https://jsondata.okiba.me/v1/json/xL3LX210624191849';
const fetchBtn = document.getElementById("js-btn-fetch");
const showModalBtn = document.getElementById("js-btn-showModal");
const modal = document.getElementById("js-modal");
const modalBody = document.getElementById("js-modal-body");
const modalOverlay = document.getElementById("js-modal-overlay");

const createLoadingImage = () => {
  const div = document.createElement('div');
  div.id = "loading"
  const img = document.createElement('img');
  img.src = "./loading-circle.gif";
  main.appendChild(div).appendChild(img);
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

const appendToMain = () => {
  main.appendChild(ul);
}

const showModal = () => {
  modal.classList.add("is-show");
}

const init = async (inputNum, inputName) => {
  console.log(inputNum);
  console.log(inputName);
  createLoadingImage();
  const response = await getListData();
  const listData = await response.json();
  removeLoadingImage();
  createList(listData);
  appendToMain();
  modal.classList.remove("is-show");
}

showModalBtn.addEventListener("click", () => {
  showModal();
});

fetchBtn.addEventListener("click", () => {
  const inputNum = document.getElementById("js-input-number");
  const inputName = document.getElementById("js-input-name");
  init(inputNum.value,inputName.value); 
});