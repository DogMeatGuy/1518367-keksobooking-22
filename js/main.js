import {getArrayRandomData, MAX_ARRAY_VALUE} from './data.js';

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const declarations = createArrayDeclarations(MAX_ARRAY_VALUE);

console.log(declarations);
