// import { v4 as uuidv4 } from 'uuid';
// const url = 'https://jsondata.okiba.me/v1/json/cp3sC210927201738';
const url = "test.json";
let allData = {};
const newsBlock = document.querySelector('.news');
const newsTabs = document.querySelector('.news_Tabs');
const newsContentWrapper = document.querySelector('.news_ContentWrapper');
let newsTabsIndex = 0;

const createNewsTabs = (allData)=> {
  const fragment = document.createDocumentFragment();
  allData.forEach((content, index)=>{
    newsTabsIndex = index;
    const li = document.createElement('li');
    li.classList.add('tab_item');
    li.textContent = content.category;
    newsTabs.appendChild(li);
  })
}

const createNewsContent = (allData)=> {
  const primaryElement = document.createElement("div");
  primaryElement.classList.add("news_Wrapper");
  const lists = document.createElement("ul");
  lists.classList.add("news_Lists");
  const primaryImageWrapper = document.createElement("div");
  // primaryImageWrapper.classList.add("news_Img");
  // const img = document.createElement("img");
  // img.src = "./img/news.png"
  // primaryImageWrapper.appendChild(img);
  primaryElement.appendChild(lists);
  primaryElement.appendChild(primaryImageWrapper);
  newsBlock.appendChild(primaryElement);
  console.log(allData);
  allData.forEach((content, index)=>{
    if(content.isActive){
      primaryImageWrapper.classList.add("news_Img");
      const img = document.createElement("img");
      img.src = content.image.img;
      primaryImageWrapper.appendChild(img);
      Object.keys(content.article).forEach((key)=>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        const comment = document.createElement('span');
        a.href = content.article[key].url;
        a.textContent = content.article[key].title;
        comment.textContent = content.article[key].commentCount;
        li.appendChild(a);
        li.appendChild(comment);
        lists.appendChild(li);
        if(content.article[key].is_new){
          console.log('new article');
        }
      })
    }
  })
  newsTabs.addEventListener('click', (event)=>{
    // event.targetにis-activeをつける
    // event.targetのidを取得し、それに紐づく記事と画像を取得
    const target = event.target;
    const tabsItems = newsTabs.querySelectorAll("li");
    console.log(allData)
    if(target.textContent === 'news'){
      event.target.classList.add('is-active');
      tabsItems[1].classList.remove('is-active');
      tabsItems[2].classList.remove('is-active');
      console.log(allData[0])
      const newsList = document.querySelector('.news_Lists');
      console.log(newsList)

      const imgWrapper = document.querySelector('.news_Img');
      imgWrapper.innerHTML = "";
      const img = document.createElement('img');
      img.src = allData[0].image.img;
      img.alt = allData[0].image.alt;
      imgWrapper.appendChild(img);
      console.log(img);

      newsList.innerHTML = "";
      Object.keys(allData[0].article).forEach((key)=>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        const comment = document.createElement('span');
        a.href = allData[0].article[key].url;
        a.textContent = allData[0].article[key].title;
        comment.textContent = allData[0].article[key].commentCount;
        li.appendChild(a);
        li.appendChild(comment);
        lists.appendChild(li);
        if(allData[0].article[key].is_new){
          console.log('new article');
        }
      })

    } else if (event.target.textContent === 'economy'){
      console.log('economy');
      event.target.classList.add('is-active');
      tabsItems[0].classList.remove('is-active');
      tabsItems[2].classList.remove('is-active');
      console.log(allData[1])
      const newsList = document.querySelector('.news_Lists');

      const imgWrapper = document.querySelector('.news_Img');
      imgWrapper.innerHTML = "";
      const img = document.createElement('img');
      img.src = allData[1].image.img;
      img.alt = allData[1].image.alt;
      imgWrapper.appendChild(img);
      console.log(img);

      newsList.innerHTML = "";
      Object.keys(allData[1].article).forEach((key)=>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        const comment = document.createElement('span');
        a.href = allData[1].article[key].url;
        a.textContent = allData[1].article[key].title;
        comment.textContent = allData[1].article[key].commentCount;
        li.appendChild(a);
        li.appendChild(comment);
        lists.appendChild(li);
        if(allData[1].article[key].is_new){
          console.log('new article');
        }
      })

    } else if (event.target.textContent === 'sports'){
      console.log('sports');
      event.target.classList.add('is-active');
      tabsItems[0].classList.remove('is-active');
      tabsItems[1].classList.remove('is-active');
      console.log(allData[2])
      const newsList = document.querySelector('.news_Lists');

      const imgWrapper = document.querySelector('.news_Img');
      imgWrapper.innerHTML = "";
      const img = document.createElement('img');
      img.src = allData[2].image.img;
      img.alt = allData[2].image.alt;
      imgWrapper.appendChild(img);
      console.log(img);

      newsList.innerHTML = "";
      Object.keys(allData[2].article).forEach((key)=>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        const comment = document.createElement('span');
        a.href = allData[2].article[key].url;
        a.textContent = allData[2].article[key].title;
        comment.textContent = allData[2].article[key].commentCount;
        li.appendChild(a);
        li.appendChild(comment);
        lists.appendChild(li);
        if(allData[2].article[key].is_new){
          console.log('new article');
        }
      })
    }
  });
}

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
  allData = await response.json();
  console.log(allData);
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

