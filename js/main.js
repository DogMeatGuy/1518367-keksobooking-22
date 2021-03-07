import { getArrayRandomData, MAX_ARRAY_VALUE, houseTranslator } from './data.js';

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const declarations = createArrayDeclarations(MAX_ARRAY_VALUE);

//Функция заполняющая шаблон попапа

const fillPopupTemplate = () => {
  let data = getArrayRandomData();

  if (data.offer.title) {
    let popupTitle = document.querySelector('.popup__title');
    popupTitle.textContent = data.offer.title;
  }

  if (data.offer.address) {
    let popupAddress = document.querySelector('.popup__text--address');
    popupAddress.textContent = data.offer.address;
  }

  if (data.offer.price) {
    let popupPrice = document.querySelector('.popup__text--price');
    popupPrice.textContent = `${data.offer.price} ₽/ночь`;
  }

  if (data.offer.type) {
    let popupType = document.querySelector('.popup__type');
    popupType.textContent = houseTranslator[data.offer.type];
  }

  if (data.offer.rooms && data.offer.guests) {
    let popupCapacity = document.querySelector('.popup__text--capacity');
    popupCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`
  }

  if (data.offer.checkIn && data.offer.checkOut) {
    let popupTime = document.querySelector('.popup__text--time');
    popupTime.textContent = `Заезд после ${data.offer.checkIn}, выезд до${data.offer.checkOut}`
  }

  if (data.offer.features) {
    let popupFeatures = document.querySelector('.popup__features');
    popupFeatures.textContent = data.offer.features;
  }

  if (data.offer.description) {
    let popupDescription = document.querySelector('.popup__description');
    popupDescription.textContent = data.offer.description;
  }

  if(data.offer.photos) {
    let popupPhotos = document.querySelector('.popup__photos');
    let popupPhoto = popupPhotos.querySelector('.popup__photo');

    for (let i = 0; i < data.offer.photos.length; i++) {
      if (data.offer.photos[i]) {
        let popupTemplate = popupPhoto.cloneNode(true);
        popupTemplate.src = data.offer.photos[i];
        popupPhotos.appendChild(popupTemplate);
      }
    }

    popupPhoto.remove();
  }
  if (data.author.avatar) {
    let popupAvatar = document.querySelector('.popup__avatar');
    popupAvatar.src = data.author.avatar;
  }

}

//Функция создающая объявления

const createPopupTemplate = () => {
  let popupCard = document.querySelector('#card');
  let popup = document.querySelector('.popup');

  for(let i = 0; i < declarations.length; i++) {
    popupCard.appendChild(popup.cloneNode(true));
    fillPopupTemplate();
  }
}


createPopupTemplate(10);
