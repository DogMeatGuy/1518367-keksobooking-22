//Функция возвращающая случайное целое число число из заданного диапозона(включительно)

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const errorMessage = ('Wrong value, try again');
  if (max <= min) {
    return errorMessage;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Функция возвращающая случайное дробное число из заданных параметров включительно. Количество знаков после запятой = 5

const getRandomFloat = (min, max) => {
  const errorMessage = ('Wrong value, try again');
  if (max <= min) {
    return errorMessage;
  }
  const getRandomFloat = Math.random() * (max - min + 1) + min;
  return +getRandomFloat.toFixed(5);
}

//Функция возвращающая случайный элемент массива

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

//Функция возвращающая массив из рандомных элементов заданного масива (Рандомайзер)

const getRandomArray = (array) => {
  const numberArray = getRandomNumber(0, array.length - 1);
  const randomArray = [];
  for (let i = 0, l = numberArray; i < l; i++) {
    const arrayElement = getRandomNumber(0, array.length - 1);
    if (!randomArray.includes(array[arrayElement])) {
      randomArray.push(array[arrayElement]);
    }
  }
  return randomArray;
};

export {getRandomNumber, getRandomFloat, getRandomElement, getRandomArray};
