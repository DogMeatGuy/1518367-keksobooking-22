const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.cloneNode(true);
const successPopup = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorPopup = errorTemplate.querySelector('.error').cloneNode(true);
const closeErrorButton = errorPopup.querySelector('.error__button');

const eventCode = 27;

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc' || evt.code === eventCode;
};

const showErrorModal = () => {
  main.appendChild(errorPopup);
  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeErrorModal();
    }
  };
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.addEventListener('click', () => {
    closeErrorModal();
  });

  const closeErrorModal = () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };
  closeErrorButton.addEventListener('click', () => {
    closeErrorModal();
  });
};

const successModal = () => {
  main.appendChild(successPopup);
  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeSuccessModal();
    }
  };
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.addEventListener('click', () => {
    closeSuccessModal();
  });
  const closeSuccessModal = () => {
    successPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };
}

export { successModal, showErrorModal };
