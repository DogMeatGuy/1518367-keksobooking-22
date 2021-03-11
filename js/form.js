import { housingPriceResource } from './consts.js';

const adForm = document.querySelector('.ad-form');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const housingType = adForm.querySelector('#type');

const typeChangeHandler = () => {
  price.placeholder = housingPriceResource[housingType.value];
  price.min = housingPriceResource[housingType.value];
};

const timeChangeHandler = (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
};


const init = () => {
  housingType.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeChangeHandler);
  timeOut.addEventListener('change', timeChangeHandler);
}

export { init };
