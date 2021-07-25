const mainScreen = document.querySelector('.main-screen');

if (mainScreen) {
  const mainScreenLinks = mainScreen.querySelectorAll('a');

  mainScreenLinks.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const id = link.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

const accordion = document.querySelector('.footer-menu');

if (accordion) {
  const accordionBlocks = accordion.querySelectorAll('.footer-menu__block');
  const accordionHeadings = accordion.querySelectorAll('.footer-menu__heading');

  accordion.classList.remove('footer-menu--nojs');

  accordionHeadings.forEach((heading, i) => {
    heading.addEventListener('click', () => {
      if (accordionBlocks[i].classList.contains('footer-menu__block--opened')) {
        accordionBlocks[i].classList.remove('footer-menu__block--opened');
      } else {
        accordionBlocks.forEach((item) => item.classList.remove('footer-menu__block--opened'));
        accordionBlocks[i].classList.add('footer-menu__block--opened');
      }
    });
  });
}
