import { getArrayRandomData, MAX_ARRAY_VALUE, houseTranslator } from './data.js';

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const declarations = createArrayDeclarations(MAX_ARRAY_VALUE);

//Функция заполняющая шаблон попапа

const mapCanvas = document.querySelector('#map-canvas');

const popupCardTemplate = document.querySelector('#card').content;

const getPopupCard = ({
  offer: {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkIn,
    checkOut,
    features,
    description,
    photos,
  },
  author: {
    avatar,
  },
}) => {
  const popupCard = popupCardTemplate.cloneNode(true);
  const featureListElement = popupCard.querySelector('.popup__features');

  if (title) {
    const popupTitle = popupCard.querySelector('.popup__title');
    popupTitle.textContent = title;
  }

  if (address) {
    const popupAddress = popupCard.querySelector('.popup__text--address');
    popupAddress.textContent = `${address.x} ${address.y}`

  }

  if (price) {
    const popupPrice = popupCard.querySelector('.popup__text--price');
    popupPrice.textContent = `${price} ₽/ночь`;
  }

  if (type) {
    const popupType = popupCard.querySelector('.popup__type');
    popupType.textContent = houseTranslator[type];
  }

  if (rooms && guests) {
    const popupCapacity = popupCard.querySelector('.popup__text--capacity');
    popupCapacity.textContent = `${rooms} комнаты для ${guests} гостей`
  }

  if (checkIn && checkOut) {
    const popupTime = popupCard.querySelector('.popup__text--time');
    popupTime.textContent = `Заезд после ${checkIn}, выезд до${checkOut}`
  }
  if (features) {
    const featureItem = featureListElement.querySelector('li');
    const fragmentFeature = document.createDocumentFragment();

    for (let i = 0; i < features.length; i++) {
      const featureElement = featureItem.cloneNode(true);

      featureElement.classList.remove('popup__feature--wifi');
      featureElement.classList.add('popup__feature--' + (features[i]));
      fragmentFeature.appendChild(featureElement);
    }
    featureListElement.innerHTML = '';
    featureListElement.appendChild(fragmentFeature);
  }

  if (description) {
    const popupDescription = popupCard.querySelector('.popup__description');
    popupDescription.textContent = description;
  }

  if (photos) {
    const popupPhotos = popupCard.querySelector('.popup__photos');
    const popupPhoto = popupPhotos.querySelector('.popup__photo');

    for (let i = 0; i < photos.length; i++) {
      if (photos[i]) {
        const popupTemplate = popupPhoto.cloneNode(true);
        popupTemplate.src = photos[i];
        popupPhotos.appendChild(popupTemplate);
      }
    }

    popupPhoto.remove();
  }
  if (avatar) {
    const popupAvatar = popupCard.querySelector('.popup__avatar');
    popupAvatar.src = avatar;
  }

  return popupCard;
}

const renderPopup = (container, data) => {
  const popupCard = getPopupCard(data);
  container.appendChild(popupCard);
}

renderPopup(mapCanvas, declarations[0]);

export { renderPopup };
