//Services
const serviceMenuItems = document.querySelectorAll('.s-menu-item');
const serviceInformationElements = document.querySelectorAll('.services-informtion');

for (let i = 0; i < serviceMenuItems.length; i++) {
    const menuItem = serviceMenuItems[i];

    menuItem.addEventListener('click', function () {

        for (let j = 0; j < serviceMenuItems.length; j++) {
            serviceMenuItems[j].classList.remove('active-s-menu-item');
        }

        this.classList.add('active-s-menu-item');

        for (let j = 0; j < serviceInformationElements.length; j++) {
            serviceInformationElements[j].classList.remove('services-informtion-active');
        }

        const serviceInformationId = this.getAttribute('data-tab');
        const serviceInformationElement = document.querySelector(serviceInformationId);
        serviceInformationElement.classList.add('services-informtion-active');
    });
}

//Work

const filterCards = document.querySelectorAll('.portfolio-card');
const portfolioBtns = document.querySelector('.portfolio-btns');
const loadBtn = document.querySelector('.btn-load');
const loader = document.querySelector('.loader');
let filter = 'all';
let cardsNum = 12;

function showLoader() {
    loadBtn.classList.add('hide');
    loader.classList.remove('hide');
}
function hideLoader() {
    loadBtn.classList.remove('hide');
    loader.classList.add('hide');
}

showCards();

loadBtn.addEventListener('click', (event) => {
    event.preventDefault();

    showLoader();
    setTimeout(() => {
        cardsNum += 12;
        hideLoader();
        showCards(filter);
    }, 3000);
});

portfolioBtns.addEventListener('click', function (event) {
    let currentBtn = document.querySelector('.portfolio-btn-active');
    currentBtn.classList.remove('portfolio-btn-active');
    event.target.classList.add('portfolio-btn-active');
    let filterBtns = event.target.dataset.filter;
    cardsNum = 12;
    filter = filterBtns;
    showCards(filterBtns);
});

function showCards(filter = 'all') {
    let j = 0;

    for (let i = 0; i < filterCards.length; i++) {
        if (
            (filterCards[i].classList.contains(filter) || filter == 'all') &&
            j < cardsNum
        ) {
            j++;
            filterCards[i].classList.remove('hide');
        } else {
            filterCards[i].classList.add('hide');
        }
    }

    if (j < cardsNum) {
        loadBtn.classList.add('hide');
    } else {
        loadBtn.classList.remove('hide');
    }
}

//Client Photo Sliders
const slides = document.querySelectorAll('.slide'),
    icons = document.querySelectorAll('.icons-portfolio'),
    leftArrow = document.querySelector('.left-arrow'),
    rightArrow = document.querySelector('.right-arrow');

let currentSlide = 0,
    currentActive = 0;

window.onload = function () {
    function playSlide(slide) {
        for (let k = 0; k < icons.length; k++) {
            slides[k].classList.remove('active');
            icons[k].classList.remove('active');
        }

        if (slide < 0) {
            slide = currentSlide = slides.length - 1;
        }

        if (slide > slides.length - 1) {
            slide = currentSlide = 0;
        }

        slides[slide].classList.add('active');
        icons[slide].classList.add('active');

        currentActive = currentSlide;
    }

    leftArrow.addEventListener('click', function () {
        playSlide((currentSlide -= 1));
    });

    rightArrow.addEventListener('click', function () {
        playSlide((currentSlide += 1));
    });

    for (let l = 0; l < icons.length; l++) {
        icons[l].addEventListener('click', function () {
            playSlide((currentSlide = Array.from(icons).indexOf(this)));
        });
    }

    playSlide(currentSlide);
};

//Gallery 

const galleryBtn = document.getElementById('gallery-btn');
const gallerySpinner = document.getElementById('gallery-loading');
const galleryImg = document.querySelectorAll('.gallery-img');

function showMoreImg() {
    galleryImg.forEach(img => {
        img.classList.add('gallery-img-active');
    });
    galleryBtn.style.display = 'none';
}

function delayImgDownload() {
    setTimeout(showMoreImg, 2000);
    gallerySpinner.style.display = 'block';
    galleryBtn.style.display = 'none';
    setTimeout(() => {
        gallerySpinner.style.display = 'none';
    }, 2000);
}

galleryBtn.addEventListener('click', delayImgDownload);