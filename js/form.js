import { housingPriceResource } from './consts.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const inputAddress = document.querySelector('#address');
const formElements = document.querySelectorAll('.map__filter, .map__features, .ad-form-header, .ad-form__element');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const housingType = adForm.querySelector('#type');
const headline = adForm.querySelector('#title');


const deactivateFormElements = (elements) => {
  elements.forEach((element) => element.disabled = true);
};

const activateFormElements = (elements) => {
  elements.forEach((element) => element.disabled = false);
};

const deactivateForms = () => {
  filterForm.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');
  deactivateFormElements(formElements);
};

const typeChangeHandler = () => {
  price.placeholder = housingPriceResource[housingType.value];
  price.min = housingPriceResource[housingType.value];
};

const timeChangeHandler = (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
};

const setInputAddress = (lat, lng) => {
  inputAddress.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
}

const activateForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  activateFormElements(formElements);
};

let numberRooms = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');

const capacityDisabled = () => {
  for (let i = 0; i < capacity.length; i++) {
    capacity[i].setAttribute('disabled', 'true');
  }
}
const capacityRemoveDisabled = (start, end) => {
  for (let i = start; i < end + 1; i++) {
    capacity[i].removeAttribute('disabled');
  }
}

if (numberRooms.value == 1) {
  capacityDisabled();
  capacity[2].selected = true;
  capacity[2].removeAttribute('disabled');
}

numberRooms.addEventListener('change', () => {
  for (let i = 0; i < numberRooms.length; i++) {
    if (numberRooms.value === capacity[i].value) {
      capacity[i].selected = true;
    }
  }
  if (numberRooms.value == 1) {
    capacityDisabled();
    capacityRemoveDisabled(2, 2);
  }
  if (numberRooms.value == 2) {
    capacityDisabled();
    capacityRemoveDisabled(1, 2);
  }
  if (numberRooms.value == 3) {
    capacityDisabled();
    capacityRemoveDisabled(0, 2);
  }
  if (numberRooms.value == 100) {
    capacityDisabled();
    capacity[3].selected = true;
    capacityRemoveDisabled(3, 3);
  }
});

const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;


headline.addEventListener('input', () => {
  const valueLength = headline.value.length;

  if (valueLength < MIN_HEADLINE_LENGTH) {
    headline.setCustomValidity('Минимальная длина 30 симв. Необходимо еще ' + (MIN_HEADLINE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_HEADLINE_LENGTH) {
    headline.setCustomValidity('Максимальная длина 100 симв. Удалите лишние ' + (valueLength - MAX_HEADLINE_LENGTH) + ' симв.');
  } else {
    headline.setCustomValidity('');
  }

  headline.reportValidity();
});

const PRICE_MAX = 1000000;

price.addEventListener('input', () => {
  if (price.validity.valueMissing) {
    price.setCustomValidity(`Обязательное поле. Максимальная цена — ${PRICE_MAX}`);
  } else {
    price.setCustomValidity('');
  }
});

inputAddress.addEventListener('invalid', () => {
  if (inputAddress.validity.valueMissing) {
    inputAddress.setCustomValidity('Обязательное поле');
  } else {
    inputAddress.setCustomValidity('');
  }
});

const init = () => {
  housingType.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeChangeHandler);
  timeOut.addEventListener('change', timeChangeHandler);
}

deactivateForms();

export { init, activateForms, setInputAddress };
