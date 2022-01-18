const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');

// в попап нужно передавать координаты, в которых показать попап
export function openPopup(x, y) {
  popupElem.classList.remove('hidden');
  popupContentElem.style.top = `${y}px`;
  popupContentElem.style.left = `${x}px`;

  if ([...arguments].includes('center')) {
    popupContentElem.style.top = `50%`;
    popupContentElem.style.left = `50%`;
    popupContentElem.style.transform = `translate(-50%, -50%)`;
  }

  document.querySelectorAll('.error-text').forEach(errorTextElem => {
    errorTextElem.remove();
  });
}

export function closePopup() {
  popupElem.classList.add('hidden');
}

function onClickInsidePopup(event) {
  event.stopPropagation();
}

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);
