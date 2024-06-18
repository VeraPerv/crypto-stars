const modalBuyForm = document.querySelector('.modal-buy');

const pristine = new Pristine(modalBuyForm, {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
});


// modalBuyForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const isValid = pristine.validate();
//   if (isValid) {
//     console.log('Можно отправлять');
//   } else {
//     console.log('Форма невалидна');
//   }
// });
