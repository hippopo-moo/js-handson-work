const url = "https://myjson.dit.upm.es/api/bins/53ad";
const newsBlock = document.getElementById("news");
const newsTabs = document.getElementById("news_Tabs");

const createNewsTabs = (allData) => {
  allData.forEach((content, index) => {
    const li = document.createElement("li");
    li.classList.add("tab_item");
    li.id = content.category;
    li.textContent = content.category;
    newsTabs.appendChild(li);
    content.isActive && li.classList.add("is-active");
  });
};

const createNewsContent = (allData) => {
  // 初期表示用の処理
  const primaryElement = document.createElement("div");
  primaryElement.classList.add("news_Wrapper");
  const lists = document.createElement("ul");
  lists.classList.add("news_Lists");
  lists.id = "news_Lists";
  const primaryImageWrapper = document.createElement("div");
  primaryElement.appendChild(lists);
  primaryElement.appendChild(primaryImageWrapper);
  newsBlock.appendChild(primaryElement);

  const selectedData = allData.find((data) => data.isActive);
  primaryImageWrapper.classList.add("news_Img");
  primaryImageWrapper.id = "news_Img";
  const img = document.createElement("img");
  img.src = selectedData.image.img;
  primaryImageWrapper.appendChild(img);

  renderNewsList(selectedData);
};

const setTabClickEvent = (allData) => {
  // タブクリック時の処理
  newsTabs.addEventListener("click", (event) => {
    // event.targetにis-activeをつける
    // event.targetのidを取得し、それに紐づく記事と画像を取得
    const target = event.target;

    // タブのindexを取得し、スタイル変更
    const activeTab = newsTabs.querySelector(".is-active");
    activeTab.classList.remove("is-active");
    target.classList.add("is-active");

    const targetData = allData.find((d) => d.category === target.id);
    setCategoryImage(targetData);
    renderNewsList(targetData);
  });
};

const setCategoryImage = (targetData) => {
  const imgWrapper = document.getElementById("news_Img");
  imgWrapper.innerHTML = "";
  const img = document.createElement("img");
  img.src = targetData.image.img;
  img.alt = targetData.image.alt;
  imgWrapper.appendChild(img);
};

const renderNewsList = ({ article }) => {
  const newsList = document.getElementById("news_Lists");
  newsList.innerHTML = "";
  Object.keys(article).forEach((key) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = article[key].url;
    a.textContent = article[key].title;
    const dateDiff = getDateDiff(article[key].publishedDate);
    if (dateDiff < 14) {
      const newMark = document.createElement("span");
      newMark.classList.add("newMark");
      newMark.innerText = "new!";
      a.appendChild(newMark);
    }
    li.appendChild(a);
    const commentCount = article[key].comment.length;
    if (commentCount > 0) {
      const comment = document.createElement("span");
      const commentIcon = document.createElement("img");
      commentIcon.src = "/lesson16/img/icon_comment.png";
      a.appendChild(commentIcon);
      comment.textContent = commentCount;
      li.appendChild(comment);
    }
    newsList.appendChild(li);
  });
};

const getDateDiff = (publishedDate) => {
  const today = new Date(Date.now());
  const date1 = new Date(publishedDate);
  const termDay = (today - date1) / 86400000;
  return Math.floor(termDay);
};

const getData = () => {
  return new Promise((resolve) => {
    try {
      resolve(fetch(url));
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
    }
  });
};

const init = async () => {
  const response = await getData();
  const allData = await response.json();
  createNewsTabs(allData.data);
  createNewsContent(allData.data);
  setTabClickEvent(allData.data);
};
init();
