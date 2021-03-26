const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarUser = document.querySelector('.ad-form__field input[type=file]');
const avatarUserPreview = document.querySelector('.ad-form-header__preview img');
const housingImg = document.querySelector('.ad-form__upload input[type=file]');
const housingImgPreviewList = document.querySelector('.ad-form__photo-list');
const housingImgPreviewItem = document.querySelector('.ad-form__photo');
const DEFAULT_AVATAR_IMG_SRC = 'img/muffin-grey.svg';
const HOUSING_IMG_WIDTH = 70;
const HOUSING_IMG_HEIGHT = 70;


const addFile = () => {
  avatarUser.addEventListener('change', () => {
    const file = avatarUser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarUserPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  housingImg.addEventListener('change', () => {
    housingImgPreviewItem.remove();
    const file = housingImg.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const housingImgPreview = new Image(HOUSING_IMG_WIDTH, HOUSING_IMG_HEIGHT);
        housingImgPreview.src = reader.result;
        housingImgPreview.classList.add('ad-form__photo')
        housingImgPreviewList.append(housingImgPreview);
      });

      reader.readAsDataURL(file);
    }
  });
}

const removeImg = () => {
  avatarUserPreview.src = DEFAULT_AVATAR_IMG_SRC;
  const housingImgs = document.querySelectorAll('.ad-form__photo-list img');
  housingImgs.forEach(element => element.remove());
  housingImgPreviewList.append(housingImgPreviewItem);
}

export {addFile, removeImg};
