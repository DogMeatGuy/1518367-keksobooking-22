import { getArrayRandomData, MAX_ARRAY_VALUE, houseTranslator } from './data.js';

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const declarations = createArrayDeclarations(MAX_ARRAY_VALUE);

//Функция заполняющая шаблон попапа

const mapCanvas = document.querySelector('#map-canvas');

const popupCardTemplate = document.querySelector('#card').content;

const getPopupCard = (data) => {
  const popupCard = popupCardTemplate.cloneNode(true);
  const featureListElement = popupCard.querySelector('.popup__features');

  if (data.offer.title) {
    const popupTitle = popupCard.querySelector('.popup__title');
    popupTitle.textContent = data.offer.title;
  }

  if (data.offer.address) {
    const popupAddress = popupCard.querySelector('.popup__text--address');
    popupAddress.textContent = `${data.offer.address.x} : ${data.offer.address.y}`

  }

  if (data.offer.price) {
    const popupPrice = popupCard.querySelector('.popup__text--price');
    popupPrice.textContent = `${data.offer.price} ₽/ночь`;
  }

  if (data.offer.type) {
    const popupType = popupCard.querySelector('.popup__type');
    popupType.textContent = houseTranslator[data.offer.type];
  }

  if (data.offer.rooms && data.offer.guests) {
    const popupCapacity = popupCard.querySelector('.popup__text--capacity');
    popupCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`
  }

  if (data.offer.checkIn && data.offer.checkOut) {
    const popupTime = popupCard.querySelector('.popup__text--time');
    popupTime.textContent = `Заезд после ${data.offer.checkIn}, выезд до${data.offer.checkOut}`
  }
  if (data.offer.features) {
    const featureItem = featureListElement.querySelector('li');
    const fragmentFeature = document.createDocumentFragment();

    for (let i = 0; i < data.offer.features.length; i++) {
      const featureElement = featureItem.cloneNode(true);

      featureElement.classList.remove('popup__feature--wifi');
      featureElement.classList.add('popup__feature--' + (data.offer.features[i]));
      fragmentFeature.appendChild(featureElement);
    }
    featureListElement.innerHTML = '';
    featureListElement.appendChild(fragmentFeature);
  }

  if (data.offer.description) {
    const popupDescription = popupCard.querySelector('.popup__description');
    popupDescription.textContent = data.offer.description;
  }

  if (data.offer.photos) {
    const popupPhotos = popupCard.querySelector('.popup__photos');
    const popupPhoto = popupPhotos.querySelector('.popup__photo');

    for (const i = 0; i < data.offer.photos.length; i++) {
      if (data.offer.photos[i]) {
        const popupTemplate = popupPhoto.cloneNode(true);
        popupTemplate.src = data.offer.photos[i];
        popupPhotos.appendChild(popupTemplate);
      }
    }

    popupPhoto.remove();
  }
  if (data.author.avatar) {
    const popupAvatar = popupCard.querySelector('.popup__avatar');
    popupAvatar.src = data.author.avatar;
  }

  return popupCard;
}

const renderPopup = (container, data) => {
  const popupCard = getPopupCard(data);
  container.appendChild(popupCard);
}

renderPopup(mapCanvas, declarations[0]);

export { renderPopup };
