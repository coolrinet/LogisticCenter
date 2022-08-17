function changeHeaderColorOnScroll() {
  let scrollTop = this.scrollY;
  introHeight = intro.clientHeight;
  headerHeight = header.clientHeight;

  if (scrollTop >= introHeight - headerHeight) {
    header.classList.add('header--dark');
  } else {
    header.classList.remove('header--dark');
  }
}

function scrollSpy(scrollTop) {
  document.querySelectorAll('[data-scrollspy]').forEach(function (elem) {
    let sectionId = elem.dataset.scrollspy;
    let sectionOffset = elem.getBoundingClientRect().top + scrollTop - (windowHeight / 3);

    let sectionLink = document.querySelector(`#nav [data-scroll=${sectionId}]`)

    if (scrollTop >= sectionOffset) {
      document.querySelectorAll('#nav [data-scroll]').forEach(
        elem => elem.classList.remove('active')
      );
      sectionLink.classList.add('active');
    }

    if (scrollTop == 0) {
      document.querySelectorAll('#nav [data-scroll]').forEach(
        elem => elem.classList.remove('active')
      );
    }
  });
}

let header = document.getElementById('header');
let nav = document.getElementById('nav');
let navToggle = document.getElementById('navToggle');
let intro = document.getElementById('intro');
let introHeight
let headerHeight;
let windowHeight = document.documentElement.clientHeight;
let scrollTop = window.scrollY;

document.addEventListener('DOMContentLoaded', function () {
  changeHeaderColorOnScroll();
  scrollSpy(scrollTop);

  ['scroll', 'resize'].forEach(
    value => window.addEventListener(value, changeHeaderColorOnScroll)
  );

  this.addEventListener('click', function (event) {
    let elem = event.target.closest('[data-scroll]');

    if (!elem) return;
    if (!elem.dataset.scroll) return;

    event.preventDefault();

    document.body.classList.remove('show-nav');
    navToggle.classList.remove('active');
    nav.classList.remove('show');

    let scrollElem = elem.dataset.scroll;
    let scrollElemPos = this.getElementById(scrollElem).getBoundingClientRect().top - headerHeight;

    window.scrollBy({
      top: scrollElemPos,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', function () {
    scrollTop = this.scrollY;
    scrollSpy(scrollTop);
  });

  this.addEventListener('click', function (event) {
    let elem = event.target.closest('[data-modal]');
    if (!elem) return;
    if (!elem.dataset.modal) return;

    event.preventDefault();

    let modal = this.getElementById(elem.dataset.modal);

    this.body.classList.add('no-scroll');
    modal.classList.add('show');

    setTimeout(() => {
      modal.querySelector('.modal__content').style.transform = 'scale(1)';

      modal.querySelector('.modal__content').style.opacity = '1';
    });
  });

  this.addEventListener('click', function (event) {
    if (!(event.target.closest('[data-modal-close]') || event.target.closest('.modal')) || event.target.closest('.modal__content') && !event.target.closest('[data-modal-close]')) return;

    event.preventDefault();

    let modal = event.target.closest('.modal');

    modal.querySelector('.modal__content').style.transform = 'scale(0.5)';
    modal.querySelector('.modal__content').style.opacity = '0';

    setTimeout(() => {
      this.body.classList.remove('no-scroll');
      modal.classList.remove('show');
    }, 200);
  });

  if (this.getElementById('introSlider')) {
    const introSlider = new Splide('#introSlider', {
      type: 'loop',
      pagination: false,
      arrows: false,
      drag: false,
      speed: 1000,
      autoplay: 'pause',
      intersection: {
        inView: {
          autoplay: true
        },
        outView: {
          autoplay: false
        }
      },
      lazyLoad: true
    });

    introSlider.mount(window.splide.Extensions);
  }

  if (this.getElementById('reviewsSlider')) {
    const reviewsSlider = new Splide('#reviewsSlider', {
      type: 'slide',
      arrows: false,
      gap: 100,
      rewind: true,
      autoHeight: true
    });

    reviewsSlider.mount();
  }

  navToggle.addEventListener('click', function (event) {
    event.preventDefault();

    this.classList.toggle('active');
    nav.classList.toggle('show');
    document.body.classList.toggle('show-nav');
  });

  window.addEventListener('resize', function () {
    navToggle.classList.remove('active');
    nav.classList.remove('show');
    document.body.classList.remove('show-nav');
  });
});