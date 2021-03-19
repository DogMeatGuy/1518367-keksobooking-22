
import { init } from './form.js';
import { initMap } from './map.js';
import { getArrayRandomData, MAX_ARRAY_VALUE } from './data.js';

//Функция возвращающая массив из полученых рандомных данных
const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const items = createArrayDeclarations(MAX_ARRAY_VALUE);



init();
initMap(items);
