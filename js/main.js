// Функция возвращающая случайное целое число из заданных параметров включительно. Функция взята из примеров MDN Web Docs с небольшой правкой.

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let errorMessage = ('Не верное значение, попробуйте снова');
  if (max <= min) {
   return errorMessage;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Функция возвращающая случайное дробное число из заданных параметров включительно. Количество знаков после запятой = 1.

let randomFloat = function getRandomFloat(min, max) {
  let errorMessage = ('Не верное значение, попробуйте снова');
  if (max <= min) {
   return errorMessage;
  }
  let randomFloat = Math.random() * (max - min + 1) + min;
 return randomFloat.toFixed(1);
}
