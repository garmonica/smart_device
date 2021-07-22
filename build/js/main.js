const mainScreen = document.querySelector('.main-screen');
const mainScreenLinks = mainScreen.querySelectorAll('a');

if (mainScreen) {
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
