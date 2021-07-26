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

const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('.header-top__button');

if (modal) {
  const modalForm = modal.querySelector('form');
  const modalClose = modal.querySelector('.modal__close');
  const modalName = modal.querySelector('input[type="text"]');
  const modalPhone = modal.querySelector('input[type="tel"]');
  const modalQuestion = modal.querySelector('textarea');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const openModal = () => {
    modal.classList.add('modal--show');
    document.body.appendChild(overlay);

    if (!modalName.value) {
      modalName.focus();
    } else if (!modalPhone.value) {
      modalPhone.focus();
    } else {
      modalQuestion.focus();
    }
  };

  const closeModal = () => {
    modal.classList.remove('modal--show');
    document.body.removeChild(overlay);
  };

  modalOpen.addEventListener('click', () => openModal());

  modalClose.addEventListener('click', () => closeModal());

  overlay.addEventListener('click', () => closeModal());

  window.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      if (modal.classList.contains('modal--show')) {
        evt.preventDefault();
        closeModal(modal);
      }
    }
  });

  modalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeModal();
  });
}

// Local Storage

const forms = document.querySelectorAll('form');
const inputsName = document.querySelectorAll('input[type="text"]');
const inputsPhone = document.querySelectorAll('input[type="tel"]');
const textareasQuestion = document.querySelectorAll('textarea');

let isStorageSupport = true;
let storageUserName = '';
let storageUserPhone = '';
let storageUserQuestion = '';

try {
  storageUserName = localStorage.getItem('user-name');
  storageUserPhone = localStorage.getItem('user-phone');
  storageUserQuestion = localStorage.getItem('user-question');
} catch (err) {
  isStorageSupport = false;
}

if (storageUserName || storageUserPhone || storageUserQuestion) {
  inputsName.forEach((name) => name.value = storageUserName);
  inputsPhone.forEach((phone) => phone.value = storageUserPhone);
  textareasQuestion.forEach((text) => text.value = storageUserQuestion);
}

forms.forEach((form, i) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isStorageSupport) {
      localStorage.setItem('user-name', inputsName[i].value);
      localStorage.setItem('user-phone', inputsPhone[i].value);
      localStorage.setItem('user-question', textareasQuestion[i].value);
    }
  });
});
