// const url = "https://myjson.dit.upm.es/api/bins/2uf9";
const url = "test.json";
const prevBtn = document.getElementById("js-slider-prevBtn");
const nextBtn = document.getElementById("js-slider-nextBtn");
const sliderWrapper = document.getElementById("js-sliderWrapper");

prevBtn.addEventListener("click", ()=> {
  controlSlide('prev');
  console.log("clickした。一つ前のスライドにします");
})
nextBtn.addEventListener("click", ()=> {
  controlSlide('next');
  console.log("clickした。一つ後ろのスライドにします");
})

const controlSlide = (btnType) => {
  const currentSlide = document.querySelector('[data-hidden="false"]');
  if(btnType === "prev") {
    // 今のcurrentのスライドの一つ前の要素をcurrentにする
    const prevSlide = currentSlide.previousElementSibling;
    currentSlide.setAttribute("data-hidden","true");
    prevSlide.setAttribute("data-hidden","false");
    console.log(prevSlide);
  } else {
    // 今のcurrentのスライドの一つ次の要素をcurrentにする
    const nextSlide = currentSlide.nextElementSibling;
    currentSlide.setAttribute("data-hidden","true");
    nextSlide.setAttribute("data-hidden","false");
    console.log(nextSlide);
  }


}

const initSlides = (slides)=> {
  const fragment = document.createDocumentFragment();
  const slideImgTemplate = (index, slide) => {
    const div = document.createElement("div");
    div.classList.add("sliderImg");
    div.id = `slide-${index}`;
    if(index === 2){
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
}

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
  const {slides} = await response.json();
  console.log(slides);
  initSlides(slides);
};
init();
