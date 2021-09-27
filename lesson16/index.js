const url = 'https://jsondata.okiba.me/v1/json/h31qa210924195736';
const newsBlock = document.querySelector('.news');
const newsTabs = document.querySelector('.news_Tabs');
const newsContentWrapper = document.querySelector('.news_ContentWrapper');
let newsTabsIndex = 0;

const createNewsTabs = (allData)=> {
  const fragment = document.createDocumentFragment();
  for (const item in allData) {
    if (Object.hasOwnProperty.call(allData, item)) {
      const element = allData[item];
      console.log(element);
      newsTabsIndex = item;
      console.log(item);
      const li = document.createElement('li');
      li.classList.add('tab_item');
      const a = document.createElement('a');
      a.classList.add('tab_item_link');
      a.textContent = element.cat;
      li.appendChild(a);
      fragment.appendChild(li);
    }
  }
  newsTabs.appendChild(fragment);
}

// const createNewsContent = (allData)=> {
//   const primaryElement = document.createElement("div");
//   primaryElement.classList.add("news_Wrapper");
//   const lists = document.createElement("ul");
//   lists.classList.add("news__listFrame--second");
//   const primaryImageWrapper = document.createElement("div");
//   primaryImageWrapper.classList.add("news__partition");
//   primaryElement.appendChild(lists);
//   primaryElement.appendChild(primaryImageWrapper);
//   newsBlock.appendChild(primaryElement);
//   if (Object.hasOwnProperty.call(allData, item)) {
//     if(allData[item].is-defaultActive){
//       console.log(allData[item].article);
//     }
//     const element = allData[item];
//     newsTabsIndex = item;
//     const li = document.createElement('li');
//     li.classList.add('tab_item');
//     const a = document.createElement('a');
//     a.classList.add('tab_item_link');
//     a.textContent = element.cat;
//     li.appendChild(a);
//     fragment.appendChild(li);
//   }
// }

const getData = () => {
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

const init = async (inputNum,inputName) => {
  // createLoadingImage();
  const response = await getData();
  const allData = await response.json();
  createNewsTabs(allData.data);
  createNewsContent(allData.data);
}
init();


// form.addEventListener("submit", (e) => {
//   const inputNum = document.getElementById("js-input-number").value;
//   const inputName = document.getElementById("js-input-name").value;
//   e.preventDefault();
//   init(inputNum,inputName); 
// });

