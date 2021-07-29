const MOBILE_WIDTH = 767;

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
  const accordionButtons = accordion.querySelectorAll('.footer-menu__button');

  accordion.classList.remove('footer-menu--nojs');
  accordionButtons.forEach((button, i) => {

    if (document.body.clientWidth <= MOBILE_WIDTH) {
      button.disabled = false;
    }

    button.addEventListener('click', () => {
      if (accordionBlocks[i].classList.contains('footer-menu__block--opened')) {
        accordionBlocks[i].classList.remove('footer-menu__block--opened');
      } else {
        accordionBlocks.forEach((item) => item.classList.remove('footer-menu__block--opened'));
        accordionBlocks[i].classList.add('footer-menu__block--opened');
      }
    });
  });
}

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

const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

const onPhoneFocus = (evt) => {
  if (!evt.target.value) {
    evt.target.value = '+7(';
  }

  if (evt.target.value === '+7(' || evt.target.value.length !== 14) {
    evt.target.setCustomValidity('Необходимо ввести 10 цифр номера');
  } else {
    evt.target.setCustomValidity('');
  }
};

const onPhoneBlur = (evt) => {
  if (evt.target.value === '+7(') {
    evt.target.value = '';
  }
};

const onPhoneClick = (evt) => {
  if (evt.target.selectionStart < 3) {
    evt.target.selectionStart = evt.target.value.length;
  }
};

const onPhonePaste = (evt) => {
  const input = evt.target;
  const inputNumbersValue = getInputNumbersValue(input);
  const pasted = evt.clipboardData || window.clipboardData;

  if (pasted) {
    const pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      input.value = inputNumbersValue;
    }
  }
};

const onPhoneInput = (evt) => {
  const input = evt.target;
  const inputNumbersValue = getInputNumbersValue(input);
  const selectionStart = input.selectionStart;
  let formattedInputValue = '+7(';

  if (!inputNumbersValue) {
    return input.value = '';
  }

  if (input.value.length !== selectionStart) {
    if (evt.data && /\D/g.test(evt.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  if (inputNumbersValue.length > 1) {
    formattedInputValue += `${inputNumbersValue.substring(1, 4)}`;
  }
  if (inputNumbersValue.length >= 5) {
    formattedInputValue += `)${inputNumbersValue.substring(4, 11)}`;
  }

  input.value = formattedInputValue;
};

const onPhoneKeyDown = function (evt) {
  const input = evt.target;
  if (evt.key === 'Backspace' && input.value.length < 3) {
    evt.preventDefault();
  }
  if (evt.key !== 'Backspace' && input.selectionStart < 3) {
    input.selectionStart = input.value.length;
  }
};

for (const input of inputsPhone) {
  input.addEventListener('keydown', onPhoneKeyDown);
  input.addEventListener('input', onPhoneInput);
  input.addEventListener('paste', onPhonePaste);
  input.addEventListener('focus', onPhoneFocus);
  input.addEventListener('blur', onPhoneBlur);
  input.addEventListener('click', onPhoneClick);
}

forms.forEach((form, i) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (inputsPhone[i].value === '+7(' || inputsPhone[i].value.length !== 14) {
      inputsPhone[i].setCustomValidity('Необходимо ввести 10 цифр номера');
    } else {
      inputsPhone[i].setCustomValidity('');
      if (isStorageSupport) {
        localStorage.setItem('user-name', inputsName[i].value);
        localStorage.setItem('user-phone', inputsPhone[i].value);
        localStorage.setItem('user-question', textareasQuestion[i].value);
      }
    }
    forms[0].reset();
  });
});

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
    document.body.style.overflow = 'hidden';

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
    document.body.style.overflow = 'auto';
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

    if (modalPhone.value.length === 14) {
      closeModal();
    }
  });
}
