const url = "https://myjson.dit.upm.es/api/bins/a1ol";
const main = document.querySelector("main");

const controlSlide = (btnType) => {
  const currentSlide = document.querySelector('[data-hidden="false"]');
  if(btnType === "prev") {
    // 今のcurrentのスライドの一つ前の要素をcurrentにする
    const prevSlide = currentSlide.previousElementSibling;
    currentSlide.setAttribute("data-hidden","true");
    prevSlide.setAttribute("data-hidden","false");
    controlSliderBtn();
  } else {
    // 今のcurrentのスライドの一つ次の要素をcurrentにする
    const nextSlide = currentSlide.nextElementSibling;
    currentSlide.setAttribute("data-hidden","true");
    nextSlide.setAttribute("data-hidden","false");
    controlSliderBtn();
  }
  updateFractionNum();

}

const initSlides = (slides)=> {
  const slider = document.createElement("div");
  slider.classList.add("slider");
  slider.id = "js-slider"
  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("sliderWrapper");
  sliderWrapper.id = "js-sliderWrapper"
  slider.appendChild(sliderWrapper);
  main.appendChild(slider);
  const fragment = document.createDocumentFragment();
  const slideImgTemplate = (index, slide) => {
    const div = document.createElement("div");
    div.classList.add("sliderImg");
    div.id = `slide-${index}`;
    if(index === 0){
      div.setAttribute("data-hidden", "false");
    } else {
      div.setAttribute("data-hidden", "true");
    }
    console.log(div);
    const img = document.createElement("img");
    img.src = slide.img;
    div.appendChild(img);
    return div;
  };
  for (const [index, slide] of slides.entries()) {
    fragment.appendChild(slideImgTemplate(index, slide));
    sliderWrapper.appendChild(fragment);
  }
  createSliderBtns();
}

const setBtnEvent = () => {
  const prevBtn = document.getElementById("js-slider-prevBtn");
  const nextBtn = document.getElementById("js-slider-nextBtn");
  prevBtn.addEventListener("click", ()=> {
    controlSlide('prev');
  })
  nextBtn.addEventListener("click", ()=> {
    controlSlide('next');
  })
}

const createSliderBtns = () => {
  const prevBtn = document.createElement("div");
  prevBtn.classList.add("sliderBtn","prev", "is-disabled");
  prevBtn.id = "js-slider-prevBtn";
  const nextBtn = document.createElement("div");
  nextBtn.classList.add("sliderBtn","next");
  nextBtn.id = "js-slider-nextBtn";
  main.querySelector(".slider").appendChild(prevBtn);
  main.querySelector(".slider").appendChild(nextBtn);
  setBtnEvent();
}

const controlSliderBtn = () => {
  const allSlides = Array.from(document.querySelectorAll(".sliderImg"));
  const currentSlide = document.querySelector('[data-hidden="false"]');
  const prevBtn = document.getElementById("js-slider-prevBtn");
  const nextBtn = document.getElementById("js-slider-nextBtn");
  const currentSlideIndex = allSlides.findIndex((slide)=>{
    return slide === currentSlide;
  });

  if (currentSlideIndex === 0) {
    prevBtn.classList.add("is-disabled");
    nextBtn.classList.remove("is-disabled");
  } else if(currentSlideIndex === 4) {
    prevBtn.classList.remove("is-disabled");
    nextBtn.classList.add("is-disabled");
  } else {
    prevBtn.classList.remove("is-disabled");
    nextBtn.classList.remove("is-disabled");
  }
}

const setFraction = (slides) => {
  const slider = document.getElementById("js-slider");
  const fraction = document.createElement("div");
  fraction.classList.add("fraction");
  const fractionWrapper = document.createElement("div");

  const numerator = document.createElement("span");
  numerator.id = "js-numerator";
  numerator.textContent = "1";
  const separator = document.createElement("span");
  separator.textContent = "/";
  const denominator = document.createElement("span");
  denominator.textContent = slides.length;

  fractionWrapper.appendChild(numerator);
  fractionWrapper.appendChild(separator);
  fractionWrapper.appendChild(denominator);

  fraction.appendChild(fractionWrapper);
  slider.appendChild(fraction);
}

const updateFractionNum = ()=> {
  const allSlides = Array.from(document.querySelectorAll(".sliderImg"));
  const currentSlide = document.querySelector('[data-hidden="false"]');
  const currentSlideIndex = allSlides.findIndex((slide)=>{
    return slide === currentSlide;
  })
  const numerator = document.getElementById("js-numerator");
  const currentSlideNum = currentSlideIndex + 1;
  numerator.textContent = currentSlideNum;
}

const setLoadingImage = () => {
  const fragmentLoadingImage = document.createDocumentFragment();
  const div = document.createElement("div");
  div.id = "js-loading";
  const img = document.createElement("img");
  img.src = "./loading-circle.gif";
  fragmentLoadingImage.appendChild(div).appendChild(img);
  main.appendChild(fragmentLoadingImage);
}

const removeLoadingImage = () => {
  const loadingImage = document.getElementById("js-loading");
  main.removeChild(loadingImage);
}

const getSlideData = () => {
  return new Promise((resolve) => {
    try {
      setTimeout(()=>{
        resolve(fetch(url));
      },3000
      );
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
    }
  });
};

const init = async () => {
  setLoadingImage();
  const response = await getSlideData();
  const {slides} = await response.json();
  removeLoadingImage();
  initSlides(slides);
  setFraction(slides);
};

init();
