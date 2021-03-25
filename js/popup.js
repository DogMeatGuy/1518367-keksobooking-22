const PHOTO_IMG_WIDTH = 45;
const PHOTO_IMG_HEIGHT = 40

const houseResource = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
}

//Функция заполняющая шаблон попапа

const popupCardTemplate = document.querySelector('#card').content;

const getPopupCard = ({ offer, author }) => {
  const popupCard = popupCardTemplate.cloneNode(true);
  const featureListElement = popupCard.querySelector('.popup__features');
  const popupTitle = popupCard.querySelector('.popup__title');
  const popupAddress = popupCard.querySelector('.popup__text--address');
  const popupPrice = popupCard.querySelector('.popup__text--price');
  const popupType = popupCard.querySelector('.popup__type');
  const popupRoomsGuests = popupCard.querySelector('.popup__text--capacity');
  const popupTimings = popupCard.querySelector('.popup__text--time');
  const popupPhotos = popupCard.querySelector('.popup__photos');

  if (offer.title) {
    popupTitle.textContent = offer.title;
  }
  else {
    popupTitle.classList.add('hidden');
  }

  if (offer.address) {
    popupAddress.textContent = offer.address;
  }

  else {
    popupAddress.classList.add('hidden');
  }

  if (offer.price) {
    popupPrice.textContent = `${offer.price} ₽/ночь`;
  }

  else {
    popupPrice.classList.add('hidden');
  }

  if (offer.type) {
    popupType.textContent = houseResource[offer.type];
  }

  else {
    popupType.classList.add('hidden');
  }

  if (offer.rooms && offer.guests) {
    popupRoomsGuests.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  else {
    popupRoomsGuests.classList.add('hidden');
  }

  if (offer.checkIn && offer.checkOut) {
    popupTimings.textContent = `Заезд после ${offer.checkIn}, выезд до${offer.checkOut}`;
  }

  else {
    popupTimings.classList.add('hidden');
  }

  if ((offer.features).length > 0) {
    featureListElement.textContent = ' ';
    offer.features.forEach((element) => {
      const featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__feature');
      const featuresClass = `popup__feature--${element}`;
      featuresItem.classList.add(featuresClass);
      featureListElement.append(featuresItem);
    });
  }
  else {
    featureListElement.classList.add('hidden');
  }

  if (offer.description) {
    popupCard.querySelector('.popup__description').textContent = offer.description;
  }

  else {
    popupCard.querySelector('.popup__description').classList.add('hidden');
  }

  if ((offer.photos).length >= 0) {
    popupPhotos.textContent = ' ';
    offer.photos.forEach((photo) => {
      const photoImg = new Image(PHOTO_IMG_WIDTH, PHOTO_IMG_HEIGHT);
      photoImg.classList.add('popup__photo');
      photoImg.src = photo;
      popupPhotos.append(photoImg);
    });
  }
  else {
    popupPhotos.classList.add('hidden');
  }

  if (author.avatar) {
    const popupAvatar = popupCard.querySelector('.popup__avatar');
    popupAvatar.src = author.avatar;
  }

  return popupCard;
}


export { getPopupCard };
