import { sendData } from './api.js';
import { HousingMinPrice, MapGeo, numberOfRooms } from './consts.js';
import { resetFilters } from './filter.js';
import { resetMap } from './map.js';
import { successModal, showErrorModal } from './modal.js';
import { MAX_VALUE_DOT } from './util.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const inputAddress = document.querySelector('#address');
const formElements = document.querySelectorAll('.map__filter, .map__features, .ad-form-header, .ad-form__element');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const description = document.querySelector('#description');
const housingType = adForm.querySelector('#type');
const headline = adForm.querySelector('#title');
const numberRooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const typeDefault = document.querySelector('#type').value;
const timeInDefault = document.querySelector('#timein').value;
const timeOutDefault = document.querySelector('#timeout').value;
const capacityDefault = document.querySelector('#capacity').value;
const featureCheckbox = document.querySelectorAll('.feature__checkbox');
const descriptionDefault = document.querySelector('#description').value;
const btnReset = document.querySelector('.ad-form__reset');

const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;
const DEFAULT_VALUE_PRICE = 1000;
const MAX_PRICE = 1000000;
const LENGTH_CHANGE_DIGIT = 1;


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

const activateForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  setDefaultInputAdress();
  activateFormElements(formElements);

};

let setDefaultInputPrice = () => {
  price.min = DEFAULT_VALUE_PRICE;
};

const roomNumberLoadHandler = () => {
  capacity.value = numberRooms.value;
};

const setInputAddress = (lat, lng) => {
  inputAddress.value = `${lat.toFixed(MAX_VALUE_DOT)} ${lng.toFixed(MAX_VALUE_DOT)}`;
}

const setDefaultInputAdress = () => {
  setInputAddress(MapGeo.LAT, MapGeo.LNG);
}


const formValidity = () => {
  price.addEventListener('input', () => {
    let message = '';
    if (price.validity.valueMissing) {
      message = 'Обязательное поле. Максимальная цена — ' + (MAX_PRICE);
    }
    price.setCustomValidity(message);
  });

  housingType.addEventListener('change', () => {
    price.placeholder = HousingMinPrice[housingType.value.toUpperCase()];
    price.min = HousingMinPrice[housingType.value.toUpperCase()];
  });

  timeIn.addEventListener('change', (evt) => {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', (evt) => {
    timeOut.value = evt.target.value;
    timeIn.value = evt.target.value;
  });

  addEventListener('change', () => {
    const capacityOptions = capacity.querySelectorAll('option');
    const roomsNumber = numberRooms.value;
    capacityOptions.forEach((option) => {
      option.disabled = true;
    });

    numberOfRooms[roomsNumber].forEach((numberOfSeats) => {
      capacityOptions.forEach((option) => {
        if (Number(option.value) === numberOfSeats) {
          option.disabled = false;
        }
      });
      if (!numberOfRooms[roomsNumber].includes(capacity.value)) {
        const maxCapacity = numberOfRooms[roomsNumber][numberOfRooms[roomsNumber].length - LENGTH_CHANGE_DIGIT];
        capacity.value = maxCapacity;
      }
    });
  });

  headline.addEventListener('input', () => {
    const valueLength = headline.value.length;
    let message = '';
    if (valueLength < MIN_HEADLINE_LENGTH) {
      message = 'Минимальная длина 30 симв. Необходимо еще ' + (MIN_HEADLINE_LENGTH - valueLength) + ' симв.'
    } else if (valueLength > MAX_HEADLINE_LENGTH) {
      message = 'Максимальная длина 100 симв. Удалите лишние ' + (valueLength - MAX_HEADLINE_LENGTH) + ' симв.'
    }
    headline.setCustomValidity(message);
    headline.reportValidity();
  });

  inputAddress.addEventListener('invalid', () => {
    if (inputAddress.validity.valueMissing) {
      inputAddress.setCustomValidity('Обязательное поле');
    } else {
      inputAddress.setCustomValidity('');
    }
    inputAddress.reportValidity();
  });
};

const universalReset = () => {
  headline.value = '';
  price.value = '';
  price.placeholder = DEFAULT_VALUE_PRICE;
  housingType.value = typeDefault;
  timeIn.value = timeInDefault;
  timeOut.value = timeOutDefault;
  capacity.value = capacityDefault;
  numberRooms.value = capacityDefault;
  featureCheckbox.forEach(element => {
    element.checked = false;
  });
  description.value = descriptionDefault;
  resetFilters();
  resetMap();
};

const onFormSuccess = () => {
  universalReset();
  successModal();
};

const resetForm = () => {
  btnReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    universalReset();
  })
}

const onError = () => {
  showErrorModal();
};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      onError,
      new FormData(evt.target),
    );
  });
};

const initForm = () => {
  resetForm();
  setDefaultInputPrice();
  formValidity();
  roomNumberLoadHandler();
  setUserFormSubmit(onFormSuccess);
}

deactivateForms();


export { initForm, activateForms, setInputAddress };
