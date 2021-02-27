// Данный фаил является бэкапом. Он потом будет удален, не обращайте внимания.






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

const AvatarValue = { MIN: 1, MAX: 8 };
const TITLE_DATA = 'Информация о помещении.';
const GeoDataValueX = { MIN: 35.65000, MAX: 35.70000 };
const GeoDataValueY = { MIN: 139.70000, MAX: 139.80000 };
const MAX_PRICE_VALUE = 20000;
const PLACE_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const MAX_ROOMS_VALUE = 4;
const MAX_GUESTS_VALUE = 10;
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['2:00', '13:00', '14:00'];
const FEATURES_DATA = ['elevator', 'dishwasher', 'parking', 'wifi', 'washer', 'conditioner'];
const DESCRIPTION_DATA = 'Неплохое место что бы отдохнуть Вам и Вашим близким';
const PHOTO_DATA = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MAX_ARRAY_VALUE = 10;


//Функция возвращающая массив из рандомных данных

const getArrayRandomData = () => {
  const getRandomAvatarNumb = getRandomNumber(AvatarValue.MIN, AvatarValue.MAX);
  const getGeoDataX = getRandomFloat(GeoDataValueX.MIN, GeoDataValueX.MAX);
  const getGeoDataY = getRandomFloat(GeoDataValueY.MIN, GeoDataValueY.MAX);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomAvatarNumb + '.png',
    },
    offer: {
      title: TITLE_DATA,
      address: {
        x: getGeoDataX,
        y: getGeoDataY
      },
      price: getRandomNumber(1, MAX_PRICE_VALUE),
      type: getRandomElement(PLACE_TYPE),
      rooms: getRandomNumber(1, MAX_ROOMS_VALUE),
      guests: getRandomNumber(1, MAX_GUESTS_VALUE),
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: getRandomArray(FEATURES_DATA),
      description: DESCRIPTION_DATA,
      photos: getRandomArray(PHOTO_DATA),
    },
    location: {
      x: getGeoDataX,
      y: getGeoDataY
    },
  };
};

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const declarations = createArrayDeclarations(MAX_ARRAY_VALUE);

