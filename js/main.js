import { getArrayRandomData, MAX_ARRAY_VALUE } from './data.js';
import { init } from './form.js';
import { activateForms, getInputAddress } from './form.js';
import { initMap } from './map.js';
import {renderPopup} from './popup.js';

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const declarations = createArrayDeclarations(MAX_ARRAY_VALUE);


renderPopup(declarations[0]);
init();
initMap();





