import{currentDatumOfBuyer} from './modal.js';
import{currentUser} from './user-profile.js';

const modalSellForm = document.querySelector('.modal-sell');

const pristineConfig = {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
};


const pristineSellForm = {
  pristine: [],
};

const pristine = new Pristine(modalSellForm, {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
});

// modalSellForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const isValid = pristine.validate();
//   if (isValid) {
//     console.log('Можно отправлять');
//   } else {
//     console.log('Форма невалидна');
//   }
// });
