import { houseResource } from './data.js';


//Функция заполняющая шаблон попапа

const popupCardTemplate = document.querySelector('#card').content;

const getPopupCard = ({ offer, author, location }) => {
  const popupCard = popupCardTemplate.cloneNode(true);
  const featureListElement = popupCard.querySelector('.popup__features');

  if (offer.title) {
    popupCard.querySelector('.popup__title').textContent = offer.title;
  }
  else {
    popupCard.querySelector('.popup__title').classList.add('hidden');
  }

  if (offer.address) {
    popupCard.querySelector('.popup__text--address').textContent = `${offer.address.x} ${offer.address.y}`
  }

  else {
    popupCard.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (offer.price) {
    popupCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }

  else {
    popupCard.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (offer.type) {
    popupCard.querySelector('.popup__type').textContent = houseResource[offer.type];
  }

  else {
    popupCard.querySelector('.popup__type').classList.add('hidden');
  }

  if (offer.rooms && offer.guests) {
    popupCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  else {
    popupCard.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (offer.checkIn && offer.checkOut) {
    popupCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkIn}, выезд до${offer.checkOut}`;
  }

  else {
    popupCard.querySelector('.popup__text--time').classList.add('hidden');
  }

  if (offer.features) {
    const featureItem = featureListElement.querySelector('li');
    const fragmentFeature = document.createDocumentFragment();

    for (let i = 0; i < offer.features.length; i++) {
      const featureElement = featureItem.cloneNode(true);

      featureElement.classList.remove('popup__feature--wifi');
      featureElement.classList.add('popup__feature--' + (offer.features[i]));
      fragmentFeature.appendChild(featureElement);
    }
    featureListElement.innerHTML = '';
    featureListElement.appendChild(fragmentFeature);
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

  if (offer.photos) {
    const popupPhotos = popupCard.querySelector('.popup__photos');
    const popupPhoto = popupPhotos.querySelector('.popup__photo');

    for (let i = 0; i < offer.photos.length; i++) {
      if (offer.photos[i]) {
        const popupTemplate = popupPhoto.cloneNode(true);
        popupTemplate.src = offer.photos[i];
        popupPhotos.appendChild(popupTemplate);
      }
    }

    popupPhoto.remove();
  }
  if (author.avatar) {
    const popupAvatar = popupCard.querySelector('.popup__avatar');
    popupAvatar.src = author.avatar;
  }

  return popupCard;
}


export { getPopupCard };
