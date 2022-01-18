const modalElem = document.querySelector('.modal');

export function openModal() {
  modalElem.classList.remove('hidden');
  modalElem.style.top = `50%`;
  modalElem.style.left = `50%`;
  modalElem.style.transform = `translate(-50%, -50%)`;

  document.querySelectorAll('.error-text').forEach(errorTextElem => {
    errorTextElem.remove();
  });
}

export function closeModal() {
  modalElem.classList.add('hidden');
}
