const url = "https://myjson.dit.upm.es/api/bins/8b9d";
const main = document.querySelector("main");
const sliderDirections = ["previous", "next"];

const controlSlide = (direction) => {
  const currentSlide = document.querySelector('[data-hidden="false"]');
  const showSlide = currentSlide[direction];
  currentSlide.setAttribute("data-hidden","true");
  showSlide.setAttribute("data-hidden","false");
  controlBtnBehavior();
  updateFractionNum();
}

const slideImgTemplate = (index, slide) => {
  const div = document.createElement("div");
  div.classList.add("sliderImg");
  div.id = `slide-${index}`;
  if(index === 0){
    div.setAttribute("data-hidden", "false");
  } else {
    div.setAttribute("data-hidden", "true");
  }
  const img = document.createElement("img");
  img.src = slide.img;
  div.appendChild(img);
  return div;
};

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
  for (const [index, slide] of slides.entries()) {
    fragment.appendChild(slideImgTemplate(index, slide));
    sliderWrapper.appendChild(fragment);
  }
  createSliderBtns();
}

const setBtnEvent = () => {
  const buttons = document.querySelectorAll(".sliderBtn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const eventTargetBtnType = e.target.getAttribute("data-btntype");
      controlSlide(`${eventTargetBtnType}ElementSibling`);
    });
  });
}

const createSliderBtns = () => {
  sliderDirections.forEach((sliderDirection) => {
    const button = document.createElement("div");
    button.classList.add("sliderBtn", `${sliderDirection}`);
    button.id = `js-slider-${sliderDirection}Btn`;
    button.setAttribute("data-btntype", `${sliderDirection}`)
    sliderDirection === "previous" && button.classList.add("is-disabled");
    main.querySelector(".slider").appendChild(button);
  });
  setBtnEvent();
}

const controlBtnBehavior = () => {
  const allSlides = Array.from(document.querySelectorAll(".sliderImg"));
  const allSlidesLength = Array.from(document.querySelectorAll(".sliderImg")).length;
  const currentSlide = document.querySelector('[data-hidden="false"]');
  const prevBtn = document.getElementById("js-slider-previousBtn");
  const nextBtn = document.getElementById("js-slider-nextBtn");
  const currentSlideIndex = allSlides.findIndex((slide)=>{
    return slide === currentSlide;
  });

  if (currentSlideIndex === 0) {
    prevBtn.classList.add("is-disabled");
    return;
  } else if(currentSlideIndex === (allSlidesLength - 1)) {
    nextBtn.classList.add("is-disabled");
    return;
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
        resolve(fetchJson(url));
      },3000
      );
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
    }
  });
};

const fetchJson = async (jsonUrl) => {
  const response = await fetch(jsonUrl);
  if(!response.ok) {
    throw new Error(`Network response was not OK: ${response.status}`);
  }
  return response;
}

const init = async () => {
  setLoadingImage();
  const response = await getSlideData();
  const {slides} = await response.json();
  removeLoadingImage();
  initSlides(slides);
  setFraction(slides);
};

init();
