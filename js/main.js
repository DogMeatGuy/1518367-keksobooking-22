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


function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
