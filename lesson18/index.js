// const url = "test.json";
const url = "https://mocki.io/v1/8e59d09b-c662-48ac-901d-20a4c3480519";
const main = document.querySelector("main");
const sliderDirections = ["previous", "next"];
const slideSpeed = 3000;
const autoSlideFlag = true;

const controlSlide = (direction) => {
  const currentSlide = document.querySelector('[data-hidden="false"]');
  const showSlide = currentSlide[direction];
  currentSlide.setAttribute("data-hidden","true");
  showSlide.setAttribute("data-hidden","false");
  controlBtnBehavior();
  updateFractionNum();
}

const controlSlideByIndex = (index) => {
  const allSlides = document.querySelectorAll(".sliderImg");
  const currentSlide = document.querySelector('[data-hidden="false"]');
  const showSlide = allSlides[index];
  currentSlide.setAttribute("data-hidden","true");
  showSlide.setAttribute("data-hidden","false");
  controlBtnBehavior();
  updateFractionNum();
}

const slideImgTemplate = (index, slide) => {
  const div = document.createElement("div");
  div.classList.add("sliderImg");
  div.id = `slide-${index}`;

  index === 0
    ? div.setAttribute("data-hidden", "false")
    : div.setAttribute("data-hidden", "true");

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

      const allSlides = Array.from(document.querySelectorAll(".sliderImg"));
      const nextSlide = document.querySelector('[data-hidden="false"]');
      const nextSlideIndex = allSlides.findIndex((slide)=>{
        return slide === nextSlide;
      });
      updatePagenation(nextSlideIndex);
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
  }
  if (currentSlideIndex === allSlidesLength - 1) {
    nextBtn.classList.add("is-disabled");
    return;
  }
  prevBtn.classList.remove("is-disabled");
  nextBtn.classList.remove("is-disabled");
}

const setPagenation = (slides) => {
  const slider = document.getElementById("js-slider");
  const pagenation = document.createElement("div");
  pagenation.classList.add("pagenation");
  const pagenationWrapper = document.createElement("div");
  pagenationWrapper.classList.add("pagenationWrapper");
  const slideLength = slides.length;

  slides.map((slide,index) => {
    const span = document.createElement("span");
    span.classList.add("pagenationBullet");
    index === 0 ? span.classList.add("is-active") : span.classList.remove("is-active");
    span.setAttribute("data-slideNo",`slideNo${index}`);
    pagenationWrapper.appendChild(span);

    span.addEventListener("click",(event)=>{
      const bullets = document.querySelectorAll(".pagenationBullet");
      const currentBullet = document.querySelector(".pagenationBullet.is-active");
      const prevBtn = document.getElementById("js-slider-previousBtn");
      const nextBtn = document.getElementById("js-slider-nextBtn");
      const activateBulletIndex = Array.from(bullets).findIndex((bullet)=>{
        return bullet === event.target;
      })
      currentBullet.classList.remove("is-active");
      bullets[activateBulletIndex].classList.add("is-active");

      if(activateBulletIndex === 0){
        prevBtn.classList.add("is-disabled");
        nextBtn.classList.remove("is-disabled");
        return;
      }
      if(activateBulletIndex === slideLength){
        nextBtn.classList.add("is-disabled");
        prevBtn.classList.remove("is-disabled");
        return;
      }

      controlSlideByIndex(index);
    });
  });
  pagenation.appendChild(pagenationWrapper);
  slider.appendChild(pagenation);
}

const updatePagenation = (currentSlideIndex) => {
  const activateSlideIndex = currentSlideIndex;
  const bullets = document.querySelectorAll(".pagenationBullet");
  const currentBullet = document.querySelector(".pagenationBullet.is-active");
  currentBullet.classList.remove("is-active");
  const activateBullet = bullets[activateSlideIndex];
  activateBullet.classList.add("is-active");
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

const autoSlide = (slides) => {
  let index = 0;
  setInterval(() => {
    controlSlideByIndex(index);
    updatePagenation((index));
    index++;
    if(index === (slides.length) ){
      index = 0;
    }
  }, slideSpeed);
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
  setPagenation(slides);
  setFraction(slides);
  if (autoSlideFlag){
    autoSlide(slides);
  }
};

init();
