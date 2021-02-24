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

//Набор данных и массивов для получения "объявлений о сдаче"

const minAvatarNumb = 1;
const maxAvatarNumb = 8;
const titleData = 'Информация о помещении.';
const maxGeoDataX = 35.70000;
const minGeoDataX = 35.65000;
const maxGeoDataY = 139.80000;
const minHeoDataY = 139.70000;
const maxPriceValue = 20000;
const placeType = ['palace', 'flat', 'house', 'bungalow'];
const maxRoomsValue = 4;
const maxGuestsValue = 10;
const checkinTime = ['12:00', '13:00', '14:00'];
const checkoutTime = ['2:00', '13:00', '14:00'];
const featuresData = ['elevator', 'dishwasher', 'parking', 'wifi', 'washer', 'conditioner'];
const descriptionData = 'Обычный бомжатник для тебя и твоих дружков за странную символическую сумму';
const photosData = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const maxArrayValue = 10;


//Функция возвращающая массив из рандомных данных

const getArrayRandomData = () => {
  const getRandomAvatarNumb = getRandomNumber(minAvatarNumb, maxAvatarNumb);
  const getGeoDataX = getRandomFloat(minGeoDataX, maxGeoDataX);
  const getGeoDataY = getRandomFloat(minHeoDataY, maxGeoDataY);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomAvatarNumb + '.png',
    },
    offer: {
      title: titleData,
      address: getGeoDataX, getGeoDataY,
      price: getRandomNumber(1, maxPriceValue),
      type: getRandomElement(placeType),
      rooms: getRandomNumber(1, maxRoomsValue),
      guests: getRandomNumber(1, maxGuestsValue),
      checkin: getRandomElement(checkinTime),
      checkout: getRandomElement(checkoutTime),
      features: getRandomArray(featuresData),
      description: descriptionData,
      photos: getRandomArray(photosData),
    },
    location: {
      x: getGeoDataX,
      y: getGeoDataY,
    },
  };
};

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  const arrayDeclarations = new Array(arrayCount).fill(null).map(() => getArrayRandomData());
  return arrayDeclarations
};

const declarations = createArrayDeclarations(maxArrayValue);
