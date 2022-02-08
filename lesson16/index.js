// const url = "https://myjson.dit.upm.es/api/bins/3aux";
const url = "https://myjson.dit.upm.es/api/bins/hmd9";
let allData = {};
const newsBlock = document.querySelector(".news");
const newsTabs = document.querySelector(".news_Tabs");

const createNewsTabs = (allData) => {
  allData.forEach((content, index) => {
    const li = document.createElement("li");
    li.classList.add("tab_item");
    li.textContent = content.category;
    newsTabs.appendChild(li);
  });
};

const createNewsContent = (allData) => {
  // 初期表示用の処理
  const primaryElement = document.createElement("div");
  primaryElement.classList.add("news_Wrapper");
  const lists = document.createElement("ul");
  lists.classList.add("news_Lists");
  const primaryImageWrapper = document.createElement("div");
  primaryElement.appendChild(lists);
  primaryElement.appendChild(primaryImageWrapper);
  newsBlock.appendChild(primaryElement);
  allData.forEach((content, index) => {
    if (content.isActive) {
      primaryImageWrapper.classList.add("news_Img");
      const img = document.createElement("img");
      img.src = content.image.img;
      primaryImageWrapper.appendChild(img);

      renderNewsList(content);
      const tabItem = document.querySelector(
        ".news_Tabs .tab_item:nth-child(1)"
      );
      tabItem.classList.add("is-active");
    }
  });

  // タブクリック時の処理
  newsTabs.addEventListener("click", (event) => {
    // event.targetにis-activeをつける
    // event.targetのidを取得し、それに紐づく記事と画像を取得
    const target = event.target;
    const tabsItems = Array.from(newsTabs.querySelectorAll("li"));

    // タブのindexを取得し、スタイル変更
    tabsItems.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const activeIndex = tabsItems.filter((tab) => {
          return tab === e.target;
        });
        const inactiveIndex = tabsItems.filter((tab) => {
          return tab !== e.target;
        });

        activeIndex[0].classList.add("is-active");
        inactiveIndex.forEach((element) => {
          element.classList.remove("is-active");
        });
      });
    });

    if (target.textContent === "news") {
      const imgWrapper = document.querySelector(".news_Img");
      imgWrapper.innerHTML = "";
      const img = document.createElement("img");
      img.src = allData[0].image.img;
      img.alt = allData[0].image.alt;
      imgWrapper.appendChild(img);

      renderNewsList(allData[0]);
    } else if (event.target.textContent === "economy") {
      const imgWrapper = document.querySelector(".news_Img");
      imgWrapper.innerHTML = "";
      const img = document.createElement("img");
      img.src = allData[1].image.img;
      img.alt = allData[1].image.alt;
      imgWrapper.appendChild(img);

      renderNewsList(allData[1]);
    } else if (event.target.textContent === "sports") {
      const imgWrapper = document.querySelector(".news_Img");
      imgWrapper.innerHTML = "";
      const img = document.createElement("img");
      img.src = allData[2].image.img;
      img.alt = allData[2].image.alt;
      imgWrapper.appendChild(img);

      renderNewsList(allData[2]);
    }
  });
};

const renderNewsList = (article) => {
  const newsList = document.querySelector(".news_Lists");
  newsList.innerHTML = "";
  Object.keys(article.article).forEach((key) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const comment = document.createElement("span");
    a.href = article.article[key].url;
    a.textContent = article.article[key].title;
    const dateDiff = getDateDiff(article.article[key].publishedDate);
    if (dateDiff < 10) {
      const newMark = document.createElement("span");
      newMark.classList.add("newMark");
      newMark.innerText = "new!";
      a.appendChild(newMark);
    }
    const commentCount = article.article[key].commentCount;
    if (commentCount > 0) {
      const commentIcon = document.createElement("img");
      commentIcon.src = "./lesson16/img/icon_comment.png";
      a.appendChild(commentIcon);
      comment.textContent = commentCount;
    }
    li.appendChild(a);
    li.appendChild(comment);
    newsList.appendChild(li);
  });
};

const getDateDiff = (publishedDate) => {
  // const publishedDateValue = new Date(publishedDate);
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
  // createLoadingImage();
  const response = await getData();
  const allData = await response.json();
  createNewsTabs(allData.data);
  createNewsContent(allData.data);
};
init();
