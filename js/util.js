const MAX_VALUE_DOT = 5;
const SHOW_TIME_ALERT = 3000;


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
  return +getRandomFloat.toFixed(MAX_VALUE_DOT);
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

// Создание и показ сообщения об ошибке при загрузки данных с сервера

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME_ALERT);
}

export { getRandomNumber, getRandomFloat, getRandomElement, getRandomArray, MAX_VALUE_DOT, showAlert };
